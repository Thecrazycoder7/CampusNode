const jwt = require("jsonwebtoken");
const ensureAuthentication = (req, res, next) => {
    const auth = req.headers["authorization"];
    if (!auth) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    const token = auth.split(" ")[1]; // Extract the token after "Bearer"

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach decoded data to the request object
      next(); // Move to the next middleware or route handler
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized, JWT token wrong" });
    }
  };
module.exports = ensureAuthentication;