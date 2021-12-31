const express = require("express");
const router = express.Router();
const {
  getConversation,
  addConversation,
} = require("../controller/conversation");
const { validate } = require("../validation/conversation");
//const { validateObjectId } = require("../middleware/validate");

const auth = require("../middleware/auth");

router.get("/:id", [auth, getConversation]);
router.post("/", auth, validate, addConversation);

//router.delete("/:id", [auth, deleteChat]);

module.exports = router;
