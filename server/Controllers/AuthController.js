const bcrypt = require("bcrypt");
const UserModel = require("../models/User.js");
const jwt = require("jsonwebtoken");

// Function to generate token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // Token expires in 1 hour
  );
};

const signup = async (req, res) => {
  try {
    const { name, college, year, branch, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userModel = new UserModel({
      name,
      email,
      year,
      branch,
      college,
      password: hashedPassword,
    });

    await userModel.save();
    console.log("User successfully registered:", req.body);

    return res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (error) {
    console.error("Error during signup:", error.message); // Log the specific error
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "User not found or password is incorrect";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Compare password hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    // Generate token using the correct user object
    const token = generateToken(user);

    // Send the response with the generated token
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  signup,
  login
};
