const router = require("express").Router();
const UserModel = require("../models/User");
const ensureAuthentication = require("../Middlewares/Auth");
router.get("/start", ensureAuthentication, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password"); // ✅ FIXED

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in /start route:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
