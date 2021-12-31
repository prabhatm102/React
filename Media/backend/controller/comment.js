const { Post } = require("../model/post");
const { User } = require("../model/user");
const { Comment } = require("../model/comment");

// const getCommentsById = async (req, res, next) => {
//   const posts = await Post.find({ user: req.params.id })
//     .populate("user", "name _id file createdAt updatedAt")
//     .select(" -__v");

//   const imageUrl =
//     req.protocol + "://" + path.join(req.headers.host, "/posts/");

//   const allPosts = posts.map((p) => {
//     p.file = imageUrl + p.file;
//     return p;
//   });
//   res.status(200).send(allPosts);
// };

// const getComments = async (req, res, next) => {
//   const posts = await Post.find({})
//     .populate("user", "name _id file createdAt updatedAt")
//     .select(" -__v");

//   const imageUrl =
//     req.protocol + "://" + path.join(req.headers.host, "/posts/");

//   const allPosts = posts.map((p) => {
//     p.file = imageUrl + p.file;
//     return p;
//   });
//   res.status(200).send(allPosts);
// };

const addComment = async (req, res, next) => {
  const user = await User.findOne({ _id: req.body.userId });
  if (!user) {
    return res.status(400).send("There is no user.");
  }
  const post = await Post.findOne({ _id: req.body.postId });
  if (!post) {
    return res.status(400).send("There is no post.");
  }
  let comment = new Comment({
    comment: req.body.comment,
    user: req.body.userId,
    post: req.body.postId,
  });

  comment = await comment.save();

  post.comments.push(comment._id);
  await post.save();

  updatedPost = await Post.findOne({ _id: post._id })
    .populate("user", "name _id file createdAt updatedAt")
    .populate({
      path: "comments",
      populate: { path: "user", select: "name _id file" },
    })
    .select(" -__v");

  res.status(200).send(updatedPost);
};

// const updateUser = async (req, res, next) => {
//   try {
//     const decoded = jwt.verify(
//       req.cookies.authToken,
//       config.get("jwtPrivateKey")
//     );

//     const user = await User.findOne({ _id: req.params.id });
//     if (!user) throw new Error("Unauthorised!");

//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.isActive = req.body.isActive;
//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.password, salt);
//     user.password = hashedPass;

//     await user.save();

//     if (decoded.isAdmin) {
//       return res.status(200).send("/dashboard");
//     }

//     res.status(200).send("/dashboard");
//   } catch (ex) {
//     return res.status(401).send("Unauthorised");
//   }
// };

// const updatePass = async (req, res) => {
//   try {
//     const decoded = jwt.verify(req.body.authToken, config.get("jwtPrivateKey"));

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) throw new Error("Unauthorised!");

//     const salt = await bcrypt.genSalt(10);
//     const hashedPass = await bcrypt.hash(req.body.cnfPass, salt);
//     user.password = hashedPass;

//     await user.save();

//     res.cookie("verify=;path='/';expires=" + new Date("01/01/1900"));

//     //Send Mail for acknowledgement

//     const link = req.get("origin") + "/signin";
//     var transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "dummyrudra@gmail.com",
//         pass: config.get("mailPass"),
//       },
//     });
//     var mailOptions = {
//       from: "dummyrudra@gmail.com",
//       to: user.email,
//       subject: "Security Updated",
//       html:
//         "<h2>Your password has been updated successfully!</h2><br><a href=" +
//         link +
//         ">SignIn to continue</a>",
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) res.status(500).send("Something Went wrong!Try again");
//       else
//         res
//           .status(200)
//           .send("Your Password has successfully updated ! Login To Continue!");
//     });
//   } catch (ex) {
//     res.cookie("authToken=;" + "path='/';expires=" + new Date("01/01/1900"));
//     return res.status(401).send("Unauthorised");
//   }
// };

// const deletePost = async (req, res, next) => {
//   const post = await Post.findOne({ _id: req.params.id });
//   if (!post) return res.status(400).send("There is no post of specified id");

//   await Post.deleteOne({ _id: post._id });
//   if (post.postFile)
//     fs.unlinkSync(path.join(__dirname, "../public/posts/") + post.postFile);

//   res.status(200).send("Post deleted successfully.");
// };

module.exports = {
  // getCommentsById,
  //getComments,
  addComment,
  //   updateUser: updateUser,
  //   updatePass: updatePass,
  // deletePost,
};
