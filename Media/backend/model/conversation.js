const mongoose = require("mongoose");

const conversation = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model("conversations", conversation);

module.exports.Conversation = Conversation;
