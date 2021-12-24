const isVerify = (req,res,next)=>{
    if(!req.cookies.verify || req.params.token!=req.cookies.verify)
      return res.status(400).redirect("/forgetpassword");
    next();
}

module.exports = {
    isVerify : isVerify
}