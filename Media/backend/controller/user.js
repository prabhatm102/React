const { User } = require("../model/user");
const { Post } = require("../model/post");
const { Comment } = require("../model/comment");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

const getUsers = async (req, res, next) => {
  const users = await User.find({}).select(" -__v");

  const imageUrl =
    req.protocol + "://" + path.join(req.headers.host, "/uploads/");

  const allUsers = users.map((u) => {
    u.file = imageUrl + u.file;
    return u;
  });
  res.status(200).send(allUsers);
};

const addUser = async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });
  if (email) {
    fs.unlinkSync(
      path.join(__dirname, "../public/uploads/") + req.file.filename
    );
    return res.status(409).send("Email Already Exists!");
  }
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    file: req.file.filename,
  });
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPass;

  await user.save();
  const token = user.genrateToken();

  res
    .status(200)
    .header("access-control-expose-headers", "x-auth-token")
    .header("x-auth-token", token)
    .send(token);
};

const updateUser = async (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.cookies.authToken,
      config.get("jwtPrivateKey")
    );

    const user = await User.findOne({ _id: req.params.id });
    if (!user) throw new Error("Unauthorised!");

    user.name = req.body.name;
    user.email = req.body.email;
    user.isActive = req.body.isActive;
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPass;

    await user.save();

    if (decoded.isAdmin) {
      return res.status(200).send("/dashboard");
    }

    res.status(200).send("/dashboard");
  } catch (ex) {
    return res.status(401).send("Unauthorised");
  }
};
const getFriends = async (req, res) => {
  const allFriends = await User.findOne({ _id: req.user._id })
    .populate("friends", "_id name file")
    .select("-_id friends");

  res.status(200).send(allFriends.friends);
};
const addFriend = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.friend });
  if (!user) return res.status(400).send("There is no friend of given id!");

  const sender = await User.findOne({ _id: req.user._id });
  if (!sender) return res.status(400).send("Invalid sender");

  const friend = sender.friends.find((f) => f == req.body.friend);
  if (friend) return res.status(400).send("Friend already exists!");
  try {
    sender.friends.push(req.body.friend);
    user.friends.push(sender._id);
    user.save();
    await sender.save();
    res.status(200).send("Friend Added");
  } catch (ex) {
    return res.status(400).send("bad request");
  }
};

const updatePass = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.authToken, config.get("jwtPrivateKey"));

    const user = await User.findOne({ email: decoded.email });
    if (!user) throw new Error("Unauthorised!");

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.cnfPass, salt);
    user.password = hashedPass;

    await user.save();

    res.cookie("verify=;path='/';expires=" + new Date("01/01/1900"));

    //Send Mail for acknowledgement

    const link = req.get("origin") + "/signin";
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dummyrudra@gmail.com",
        pass: config.get("mailPass"),
      },
    });
    var mailOptions = {
      from: "dummyrudra@gmail.com",
      to: user.email,
      subject: "Security Updated",
      html:
        "<h2>Your password has been updated successfully!</h2><br><a href=" +
        link +
        ">SignIn to continue</a>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) res.status(500).send("Something Went wrong!Try again");
      else
        res
          .status(200)
          .send("Your Password has successfully updated ! Login To Continue!");
    });
  } catch (ex) {
    res.cookie("authToken=;" + "path='/';expires=" + new Date("01/01/1900"));
    return res.status(401).send("Unauthorised");
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).send("There is no user of specified id");

  await User.deleteOne({ _id: user._id });
  await Post.deleteMany({ user: user._id });
  await Comment.deleteMany({ user: user._id });

  fs.unlinkSync(path.join(__dirname, "../public/uploads/") + user.file);
  // const decoded = jwt.verify(
  //   req.cookies.authToken,
  //   config.get("jwtPrivateKey")
  // );
  // if (decoded.isAdmin) {
  //   return res.status(200).send("/dashboard");
  // }
  res.status(200).send("User deleted successfully.");
};

const sendMail = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).send("Invalid Email!");

  const token = user.genrateToken();

  const d = new Date();
  d.setTime(d.getTime() + 1000 * 60 * 10);
  // console.log(d.toLocaleTimeString());
  const expDate = d.toUTCString();

  const link = req.get("origin") + "/changepassword/" + token;

  res.cookie("verify=" + token + ";expires=" + expDate);

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "dummyrudra@gmail.com",
      pass: config.get("mailPass"),
    },
  });
  var mailOptions = {
    from: "dummyrudra@gmail.com",
    to: user.email,
    subject: "Verify your email",
    html:
      "<h2>Click on the below link to reset password</h2><br><a href=" +
      link +
      ">Forget Password</a>",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) res.status(500).send("Something Went wrong!Try again");
    else res.status(200).send("Please check your mail to reset password");
  });
};

module.exports = {
  getUsers: getUsers,
  addUser: addUser,
  addFriend,
  getFriends,
  updateUser: updateUser,
  updatePass: updatePass,
  deleteUser: deleteUser,
  sendMail: sendMail,
};
