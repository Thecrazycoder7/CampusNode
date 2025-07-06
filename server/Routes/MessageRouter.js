const express = require("express");
const router = express.Router();
const protectRoute = require("../Middlewares/ProtectRoute");
const {
  getUsersForSidebar,
  getMessages,
  sendMessage,
} = require("../Controllers/MessageController");

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

module.exports = router;
