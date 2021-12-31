const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("User connected:" + socket.id);

  socket.on("joinRoom", (data) => {
    console.log(`User with id ${socket.id} joint room ${data}`);
    socket.join(data);
  });

  socket.on("sendMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });

  socket.on("privateMessage", (data) => {
    socket.to(data.room).emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected:" + socket.id);
  });
});

//io.sockets.emit("hi", "everyone");
server.listen(5000, () => {
  console.log("Server is listening at PORT 5000...");
});
