const express = require("express");
const router = express.Router();
const { addComment } = require("../controller/comment");
const { validate } = require("../validation/comment");
const auth = require("../middleware/auth");

// router.get("/:id", [auth, getCommentsById]);
// router.get("/", [getComments]);
router.post("/", auth, validate, addComment);

//router.delete("/:id", [auth, deleteComment]);

module.exports = router;
