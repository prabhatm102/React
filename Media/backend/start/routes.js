const error = require("../middleware/error");
const auth = require("../middleware/auth");
// const { isLogin } = require("../middleware/isLogin");
// const { isVerify } = require("../middleware/isVerify");

const express = require("express");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
const cors = require("cors");

const users = require("../routes/user");
const login = require("../routes/auth");
const post = require("../routes/post");
const comment = require("../routes/comment");
const conversation = require("../routes/conversation");

const path = require("path");

module.exports = function (app) {
  app.use(cors());
  app.use(express.static("public/"));
  app.use(favicon("public/favicon/favicon.ico"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  // API
  app.use("/api/users", users);
  app.use("/api/logins", login);
  app.use("/api/posts", post);
  app.use("/api/comments", comment);
  app.use("/api/conversations", conversation);

  //Templates
  // Before Login
  app.get("/public/uploads/:file", auth, async (req, res) => {
    res.download(
      path.join(__dirname, "../", "public/uploads/") + req.params.file
    );
  });

  app.use(error);
};
