const { Post } = require("../model/post");
const { Comment } = require("../model/comment");
const { User } = require("../model/user");
const fs = require("fs");
const path = require("path");

const getPostsById = async (req, res, next) => {
  const posts = await Post.find({ user: req.params.id })
    .populate("user", "name _id file createdAt updatedAt")
    .populate({
      path: "comments",
      populate: { path: "user", select: "name _id file" },
    })
    .select(" -__v");

  const imageUrl =
    req.protocol + "://" + path.join(req.headers.host, "/posts/");

  const allPosts = posts.map((p) => {
    p.file = imageUrl + p.file;
    return p;
  });
  res.status(200).send(allPosts);
};

const getPosts = async (req, res, next) => {
  const posts = await Post.find({})
    .populate("user", "name _id file createdAt updatedAt")
    .populate({
      path: "comments",
      populate: { path: "user", select: "name _id file" },
    })
    .select(" -__v");

  const imageUrl =
    req.protocol + "://" + path.join(req.headers.host, "/posts/");

  const allPosts = posts.map((p) => {
    p.file = imageUrl + p.file;
    return p;
  });
  res.status(200).send(allPosts);
};

const addPost = async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) {
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "../public/posts/") + req.file.filename
      );
    }

    return res.status(400).send("There is no user.");
  }

  let post = new Post({
    message: req.body.message,
    user: req.params.id,
  });
  if (req.file) {
    post.postFile = req.file.filename;
  }

  await post.save();

  const posts = await Post.findOne({ _id: post._id })
    .populate("user", "name _id file createdAt updatedAt")
    .populate("comments", "_id comment")
    .select(" -__v");

  res.status(200).send(posts);
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

// const updatePost = async (req, res) => {
//     const user = await User.findOne({ email: decoded.email });
//     if (!user) throw new Error("Unauthorised!");

//     await post.save();

// };

const deletePost = async (req, res, next) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) return res.status(400).send("There is no post of specified id");

  await post.comments.map(
    async (comment) => await Comment.deleteOne({ _id: comment._id })
  );

  await Post.deleteOne({ _id: post._id });
  if (post.postFile)
    fs.unlinkSync(path.join(__dirname, "../public/posts/") + post.postFile);

  res.status(200).send("Post deleted successfully.");
};

module.exports = {
  getPostsById,
  getPosts,
  addPost,
  //updatePost,
  //   updatePass: updatePass,
  deletePost,
};
