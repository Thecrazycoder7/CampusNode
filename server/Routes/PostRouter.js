const express = require("express");
const router = express.Router();

const upload = require("../Middlewares/upload");
const verifyToken = require("../Middlewares/PostValidation");

const {
  getPost,
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
} = require("../Controllers/PostController");

const cloudinary = require("../config");

// Inside your route handler
const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "posts", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      )
      .end(fileBuffer);
  });
};

// Create a post with media upload
router.post("/", verifyToken,  createPost);

// Get all posts
router.get("/", verifyToken, getAllPosts);

// Get single post
router.get("/:id", getPost);

// Update post
router.put("/:id", verifyToken, updatePost);

// Delete post
router.delete("/:id", verifyToken, deletePost);

module.exports = router;
