const isLogin = (req,res,next)=>{
    if(req.cookies.authToken)
      return res.status(200).redirect("/dashboard");
    next();
}

module.exports = {
    isLogin:isLogin
}