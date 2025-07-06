const bcrypt = require("bcrypt");
const UserModel = require("../Models/User.js");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const {
      name,
      college,
      year,
      branch,
      email,
      password,
      linkedin,
      github,
      about,
      skills,
    } = req.body;
    const existingUser = await UserModel.findOne({ email });

    // Check for missing fields

    if (
      !name ||
      !college ||
      !year ||
      !branch ||
      !email ||
      !password ||
      !linkedin ||
      !github ||
      !about ||
      !skills
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
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
      linkedin,
      github,
      about,
      skills,
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

// Inside your AuthController.js (or wherever your login function is)

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    const errorMsg = "User not found or password is incorrect";

    if (!user) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({ message: errorMsg, success: false });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email }, // Using _id from Mongoose user object
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // --- CRITICAL CHANGE HERE ---
    // Destructure the user properties you want to send to the frontend
    // Or, better yet, send the whole user object if it's not too sensitive
    const { _id, name, branch, college, year, linkedin, github, about, skills, isVerified } = user;

    // Send the response with the generated token AND the complete user object
    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        // <-- NEST THE USER DETAILS HERE
        _id,
        name,
        email: user.email, // Use user.email as it was part of original query
        branch,
        college,
        year,
        linkedin,
        github,
        about,
        skills,
        isVerified: user.isVerified || false,
      },
    });
    // --- END CRITICAL CHANGE ---

  } catch (error) {
    console.error("Error during login:", error.message); // Added for better server-side debugging
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

module.exports = {
  signup,
  login
};
