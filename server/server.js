const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");

dotenv.config();

connectDB();
const authRoutes = require("./routes/authRoutes");
const app = express();
const messageRoutes =require("./routes/messageRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(
  "/api/messages",
  messageRoutes
);
app.get("/", (req, res) => {
  res.send("Discord Clone API Running");
});

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("send_message", (data) => {

  console.log(
    "MESSAGE RECEIVED:",
    data
  );

  io.emit(
    "receive_message",
    data
  );
});

  socket.on("disconnect", () => {
    console.log("User Disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});