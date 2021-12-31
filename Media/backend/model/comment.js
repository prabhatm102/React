const mongoose = require("mongoose");

const comment = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 255,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comments", comment);

module.exports.Comment = Comment;
