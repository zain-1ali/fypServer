let io;

const setupSocket = (serverIo) => {
  io = serverIo;
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

const emitEvent = (event, data) => {
  io.emit(event, data);
};

export { setupSocket, emitEvent };
