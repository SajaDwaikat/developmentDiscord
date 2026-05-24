import {useState,useEffect,useRef,} from "react";
import {useNavigate,} from "react-router-dom";
import api from "../services/api";
import socket from "../socket";
import "../styles/chat.css";
import {FaComments,FaDesktop,FaCode,} from "react-icons/fa";

function Chat() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    ) || {
      username: "Guest",
    };

  const [channel, setChannel] =
    useState("General");

  const [message, setMessage] =
    useState("");

  const [messages, setMessages] =
    useState([]);

  const [menuOpen, setMenuOpen] =
    useState(false);

  const messagesEndRef =
    useRef(null);

  const channels = [
    {
      name: "General",
      icon: <FaComments />,
    },
    {
      name: "OS Course",
      icon: <FaDesktop />,
    },
    {
      name: "Dev Hub",
      icon: <FaCode />,
    },
  ];

  const currentChannel =
    channels.find(
      (item) =>
        item.name === channel
    );

  const loadMessages =
    async () => {
      try {
        const res =
          await api.get(
            `/messages/${channel}`
          );

        const formatted =
          res.data.map(
            (msg) => ({
              username:
                msg.sender,
              text: msg.text,
              createdAt:
                msg.createdAt,
            })
          );

        setMessages(
          formatted
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    loadMessages();

    socket.on(
      "receive_message",
      (data) => {
        if (
          data.channel ===
          channel
        ) {
          setMessages(
            (prev) => [
              ...prev,
              data,
            ]
          );
        }
      }
    );

    return () => {
      socket.off(
        "receive_message"
      );
    };
  }, [channel]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView(
      {
        behavior:
          "smooth",
      }
    );
  }, [messages]);

  const sendMessage =
    async () => {
      if (
        !message.trim()
      )
        return;

      const newMessage = {
        username:
          user.username,
        text: message,
        channel,
        createdAt:
          new Date(),
      };

      socket.emit(
        "send_message",
        newMessage
      );

      try {
        await api.post(
          "/messages",
          {
            sender:
              user.username,
            channel,
            text: message,
          }
        );
      } catch (error) {
        console.log(error);
      }

      setMessage("");
    };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="chat-container">

      <div
        className={
          menuOpen
            ? "sidebar sidebar-open"
            : "sidebar"
        }
      >
        <div className="sidebar-brand">
          <div className="brand-logo">
            D
          </div>

          <div>
            <h2>
              Discord Clone
            </h2>

            <p>
              Real-Time Chat
            </p>
          </div>
        </div>

        {channels.map(
          (item) => (
            <div
              key={
                item.name
              }
              className={
                channel ===
                item.name
                  ? "channel active-channel"
                  : "channel"
              }
              onClick={() => {
                setChannel(
                  item.name
                );

                setMenuOpen(
                  false
                );
              }}
            >
              <span className="channel-icon">
                {
                  item.icon
                }
              </span>

              <span>
                {
                  item.name
                }
              </span>
            </div>
          )
        )}

        <div className="current-user">
          <div className="user-avatar">
            {user.username
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div className="user-info">
            <strong>
              {
                user.username
              }
            </strong>

            <span className="status">
              ● Online
            </span>
          </div>
        </div>

        <button
          className="logout-btn"
          onClick={
            logout
          }
        >
          Logout
        </button>
      </div>

      <div className="chat-section">

      <div className="chat-header">
  <h3 className="header-title">
    <span className="header-icon">
      {currentChannel?.icon}
    </span>

    <span>
      {channel}
    </span>
  </h3>
</div>

        <div className="messages">

          {messages.length ===
          0 ? (
            <div className="empty-state">
              <h3>
                Welcome to{" "}
                {
                  channel
                }
              </h3>

              <p>
                Start the
                conversation
                and send
                your first
                message.
              </p>
            </div>
          ) : (
            messages.map(
              (
                msg,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="message"
                >
                  <div className="avatar">
                    {msg.username
                      ?.charAt(
                        0
                      )
                      .toUpperCase()}
                  </div>

                  <div className="message-content">

                    <div className="message-header">

                      <span className="message-user">
                        {
                          msg.username
                        }
                      </span>

                      <span className="message-time">
                        {msg.createdAt
                          ? new Date(
                              msg.createdAt
                            ).toLocaleTimeString(
                              [],
                              {
                                hour:
                                  "2-digit",
                                minute:
                                  "2-digit",
                              }
                            )
                          : ""}
                      </span>

                    </div>

                    <div className="message-text">
                      {
                        msg.text
                      }
                    </div>

                  </div>
                </div>
              )
            )
          )}

          <div
            ref={
              messagesEndRef
            }
          />
        </div>

        <div className="message-input">

          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(
              e
            ) =>
              setMessage(
                e.target.value
              )
            }
            onKeyDown={(
              e
            ) => {
              if (
                e.key ===
                "Enter"
              ) {
                e.preventDefault();
                sendMessage();
              }
            }}
          />

          <button
            className="send-btn"
            onClick={
              sendMessage
            }
          >
            ➜
          </button>

        </div>

      </div>

    </div>
  );
}

export default Chat;