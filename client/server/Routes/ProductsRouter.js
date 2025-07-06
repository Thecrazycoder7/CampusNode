const ensureAuthentication = require("../Middlewares/Auth");
const router = require("express").Router();

// Define the route for /products
router.get("/", ensureAuthentication, (req, res) => {
  res.status(200).json({
    name: "Suman",
    college: "RTCIT",
    year: "2025",
  });
});

module.exports = router;
