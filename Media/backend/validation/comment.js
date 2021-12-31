const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
module.exports.validate = (req, res, next) => {
  const schema = Joi.object({
    comment: Joi.string().required().min(1).max(255),
    userId: Joi.objectId().required(),
    postId: Joi.objectId().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};
