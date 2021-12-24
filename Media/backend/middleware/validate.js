const mongoose  = require("mongoose");

module.exports.validateObjectId = (req,res,next)=>{
  if(!mongoose.Types.ObjectId.isValid)
     return res.status(400).send("Invalid Id Format");
  next();   
}