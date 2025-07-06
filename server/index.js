const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/AuthRouter.js");
const postRoutes = require("./Routes/PostRouter.js");
const messageRoutes = require("./Routes/MessageRouter.js");
const { handleSocketConnection } = require("./socket.js"); // 👈 central socket logic
const connectDB = require("./Models/db.js");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// 👇 pass io to handler
handleSocketConnection(io);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use("/messages", messageRoutes);

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
