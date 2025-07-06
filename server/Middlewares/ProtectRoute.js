const jwt = require("jsonwebtoken");
const User = require("../Models/User");

const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log("authHeader:", authHeader); // 🔍 check if header is even sent

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized - No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decoded:", decoded);

    const user = await User.findById(decoded._id).select("-password");
    console.log("user:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // ✅ this must happen
    next();
  } catch (err) {
    console.log("protectRoute error:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = protectRoute;
