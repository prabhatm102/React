const Joi = require("joi");
module.exports.validatePass = (req,res,next)=>{
 
    const schema = Joi.object({
        newPass:Joi.string().required().min(8),
        cnfPass:Joi.string().required().min(8),
        authToken:Joi.string()
    });
      const { error } = schema.validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
      next();  
}