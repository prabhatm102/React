const { Conversation } = require("../model/conversation");
const { User } = require("../model/user");
const { Message } = require("../model/message");
const io = require("../index");
const getConversation = async (req, res, next) => {
  const conversation = await Conversation.findOne({
    $or: [
      {
        sender: req.user._id,
        receiver: req.params.id,
      },
      {
        sender: req.params.id,
        receiver: req.user._id,
      },
    ],
  }).select(" -__v");
  let chats;
  if (conversation)
    // chats = await Message.find({ conversation: conversation._id })
    //   .populate("sender", "name _id file ")
    //   .populate({
    //     path: "conversation",
    //     populate: { path: "receiver", select: "name _id file" },
    //   });
    chats = await Message.find({ conversation: conversation._id })
      .populate("sender", "name _id file ")
      .select("-__v -createdAt");
  else chats = [];
  res.status(200).send(chats);
};

// const getConversation = async (req, res, next) => {
//   const posts = await Post.find({})
//     .populate("user", "name _id file createdAt updatedAt")
//     .populate({
//       path: "comments",
//       populate: { path: "user", select: "name _id file" },
//     })
//     .select(" -__v");

//   const imageUrl =
//     req.protocol + "://" + path.join(req.headers.host, "/posts/");

//   const allPosts = posts.map((p) => {
//     p.file = imageUrl + p.file;
//     return p;
//   });
//   res.status(200).send(allPosts);
// };

const addConversation = async (req, res, next) => {
  const sender = await User.findOne({ _id: req.user._id });
  if (!sender) {
    return res.status(400).send("There is no sender.");
  }
  const receiver = await User.findOne({ _id: req.body.receiver });

  if (!receiver || sender.email === receiver.email) {
    return res.status(400).send("There is no receiver.");
  }

  //   if(sender.friends.indexOf(receiver)===-1){
  //     return res.status(401).send("You are not friend of this receiver.");
  //   }
  let conversation = await Conversation.findOne({
    $or: [
      {
        sender: req.user._id,
        receiver: req.body.receiver,
      },
      {
        sender: req.body.receiver,
        receiver: req.user._id,
      },
    ],
  }).select(" -__v");

  if (!conversation) {
    conversation = new Conversation({
      sender: req.user._id,
      receiver: req.body.receiver,
    });
    conversation = await conversation.save();
  }

  let message = new Message({
    sender: req.user._id,
    message: req.body.message,
    conversation: conversation._id,
  });

  message = await message.save();

  const messages = await Message.find({ conversation: conversation._id })
    // .populate("sender", "name _id file email")
    // .populate({
    //   path: "conversation",
    //   populate: { path: "receiver", select: "name _id file email" },
    // })
    // .select(" -__v");
    .populate("sender", "name _id file ")
    .select("-__v -createdAt");
  io.to(req.body.receiver).emit(
    "receiveMessage",
    messages[messages.length - 1]
  );
  res.status(200).send(messages[messages.length - 1]);
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

// const deletePost = async (req, res, next) => {
//   const post = await Post.findOne({ _id: req.params.id });
//   if (!post) return res.status(400).send("There is no post of specified id");

//   await post.comments.map(
//     async (comment) => await Comment.deleteOne({ _id: comment._id })
//   );

//   await Post.deleteOne({ _id: post._id });
//   if (post.postFile)
//     fs.unlinkSync(path.join(__dirname, "../public/posts/") + post.postFile);

//   res.status(200).send("Post deleted successfully.");
// };

module.exports = {
  getConversation,
  addConversation,
  //updatePost,
  //   updatePass: updatePass,
  //deletePost,
};
