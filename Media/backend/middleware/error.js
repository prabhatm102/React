require("express-async-errors");
const winston = require("winston");

module.exports = (err,req,res,next)=>{
    winston.error(err.message);
    winston.add(new winston.transports.File({filename:"logException.log"}));
    res.status(500).send("Something Went Wrong!");
}
