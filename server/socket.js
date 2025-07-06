// === lib/socket.js ===
const userSocketMap = {}; // { userId: socketId }

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
      console.log("A user disconnected", socket.id);

      for (let id in userSocketMap) {
        if (userSocketMap[id] === socket.id) {
          delete userSocketMap[id];
          break;
        }
      }

      io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
  });
};

module.exports = {
  handleSocketConnection,
  getReceiverSocketId,
};
