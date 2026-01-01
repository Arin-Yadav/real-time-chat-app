const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

io.on("connection", (socket) => {
  console.log("A new user connected", socket.id);

  socket.on("message", (message) => {
    // console.log(message);
    io.emit("received-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`user disconnected ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
