const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000, // Limit content length as appropriate
    },
    mediaUrl: {
      type: String,
      default: null,
      trim: true,
    },
    likeCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
