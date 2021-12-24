const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  updateUser,
  updatePass,
  deleteUser,
  sendMail,
} = require("../controller/user");
const { validate } = require("../validation/user");
const { validateEmail } = require("../validation/validateEmail");
const { validatePass } = require("../validation/validatePass");
const { validateObjectId } = require("../middleware/validate");
const auth = require("../middleware/auth");
//const { allowCrossDomain } = require("../middleware/allowCrossDomain");

const multer = require("multer");
const upload = multer({ dest: "./public/uploads/" });

router.get("/", [auth, getUsers]);
router.post("/", upload.single("file"), validate, addUser);
router.post("/sendmail", validateEmail, sendMail);

router.put("/changepassword/", [validatePass, auth, updatePass]);
router.put("/:id", [validateObjectId, validate, updateUser]);

router.delete("/:id", [validateObjectId, deleteUser]);

module.exports = router;
