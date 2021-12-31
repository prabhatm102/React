const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  getFriends,
  addFriend,
  updateUser,
  updatePass,
  deleteUser,
  sendMail,
} = require("../controller/user");
const { validate } = require("../validation/user");
const { validateEmail } = require("../validation/validateEmail");
const { validatePass } = require("../validation/validatePass");
const { validateFriend } = require("../validation/validateFriend");
const { validateObjectId } = require("../middleware/validate");
const auth = require("../middleware/auth");
//const { allowCrossDomain } = require("../middleware/allowCrossDomain");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/getFriends", [auth, getFriends]);
router.get("/", [auth, getUsers]);
router.post("/", upload.single("file"), validate, addUser);
router.post("/sendmail", validateEmail, sendMail);

router.put("/addFriend", [auth, validateFriend, addFriend]);
router.put("/changepassword/", [validatePass, auth, updatePass]);
router.put("/:id", [validateObjectId, validate, updateUser]);

router.delete("/:id", [validateObjectId, deleteUser]);

module.exports = router;
