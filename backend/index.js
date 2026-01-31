import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import userRoutes from "./routes/user.Routes.js";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

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
  }),
);

app.get("/", (req, res) => {
  res.send("Hello");
});

const ROOM = "group";

io.on("connection", (socket) => {
  // console.log(`A user is connected ${socket.id}`);
  socket.on("joinRoom", async (userName) => {
    await socket.join(ROOM);
    // console.log(`${userName} has joined the Room ${socket.id}`);
    // send to all including the sender
    // io.to(ROOM).emit("roomNotice", userName);

    // broadcast
    socket.to(ROOM).emit("roomNotice", userName);
    // io.to(ROOM).emit("message", message)
  });

  socket.on("message", (message) => {
    io.to(ROOM).emit('message', message)
    // console.log(message)  
  });

  // socket.on("disconnect", () => {
  //   console.log(`user disconnected ${socket.id}`);
  // });
});

server.listen(3000, () => {
  console.log("server is running at http://localhost:3000");
});
