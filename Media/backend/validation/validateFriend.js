const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

module.exports.validateFriend = (req, res, next) => {
  const schema = Joi.object({
    friend: Joi.objectId().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  next();
};
