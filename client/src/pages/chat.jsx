import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import socket from "../socket";
import "../styles/chat.css";
function Chat() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [channel, setChannel] =
    useState("General");

  const [message, setMessage] =
    useState("");

const [messages, setMessages] =
  useState([]);
  const loadMessages = async () => {
  try {
    const res = await api.get(
      `/messages/${channel}`
    );

    const formatted =
      res.data.map((msg) => ({
        username: msg.sender,
        text: msg.text,
      }));

    setMessages(formatted);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  loadMessages();

  socket.on(
    "receive_message",
    (data) => {
      if (data.channel === channel) {
        setMessages((prev) => [
          ...prev,
          data,
        ]);
      }
    }
  );

  
  return () => {
    socket.off(
      "receive_message"
    );
  };
}, [channel]);

  const channels = [
    "General",
    "React",
    "NodeJS",
  ];

const sendMessage = async () => {
  if (!message.trim()) return;

  const newMessage = {
    username: user.username,
    text: message,
    channel,
  };

  socket.emit("send_message", newMessage);

  try {
    await api.post("/messages", {
      sender: user.username,
      channel,
      text: message,
    });
  } catch (error) {
    console.error(error);
  }

  setMessage("");
};

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="chat-container">

      <div className="sidebar">
        <h2>Discord Clone</h2>

        {channels.map((item) => (
          <div
            key={item}
            className={
              channel === item
                ? "channel active-channel"
                : "channel"
            }
            onClick={() =>
              setChannel(item)
            }
          >
            # {item}
          </div>
        ))}

        <br />

        <button
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="chat-section">

        <div className="chat-header">
          <h3>
            # {channel}
          </h3>
        </div>

        <div className="messages">

          {messages.map(
            (msg, index) => (
              <div
                key={index}
                className="message"
              >
                <div className="message-user">
                  {msg.username}
                </div>

                <div>
                  {msg.text}
                </div>
              </div>
            )
          )}
        </div>

        <div className="message-input">

         <input
           type="text"
             placeholder="Type a message..."
               value={message}
                 onChange={(e) =>
                   setMessage(e.target.value)
  }
      onKeyDown={(e) => {
         if (e.key === "Enter") {
          sendMessage();
 }
}}
/>

          <button
            onClick={
              sendMessage
              
            }
          >
            Send
          </button>

        </div>

      </div>
    </div>
  );
}

export default Chat;