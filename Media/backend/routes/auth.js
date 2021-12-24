const express =  require("express");
const router = express.Router();
const { auth, logout } = require("../controller/auth");
const { validateLogin } = require("../validation/validateLogin");
const { validateObjectId } = require("../middleware/validate");

router.post("/",validateLogin,auth);
router.put("/:id",validateObjectId,logout);
module.exports = router;