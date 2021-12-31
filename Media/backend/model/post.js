const mongoose = require("mongoose");

const post = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },

    postFile: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "comments", default: {} },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("posts", post);

module.exports.Post = Post;
