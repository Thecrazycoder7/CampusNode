const jwt = require("jsonwebtoken");
const ensureAuthentication = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      return res.status(401).json({ success: false, message: "No token" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user; // Attach user info to request object
      next();    
  })
}
module.exports = ensureAuthentication;