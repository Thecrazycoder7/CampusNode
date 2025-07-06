const PostModel = require("../Models/Posts.js");
const cloudinary = require("../config.js");
// Get all posts (latest first)
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({})
      .sort({ createdAt: -1 })
      .populate("user", "name email"); // Optional: to get user info
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching all posts:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while fetching posts." });
  }
};


// Create a new post
const createPost = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "posts", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(req.file.buffer);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
};

// Get a single post by ID
const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostModel.findById(id).populate("user", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while fetching the post." });
  }
};

// Update a post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, mediaUrl } = req.body;

    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { content, mediaUrl },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while updating the post." });
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPost = await PostModel.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error while deleting the post." });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPost,
  updatePost,
  deletePost,
};
