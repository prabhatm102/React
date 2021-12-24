const Joi = require("joi");
const fs = require("fs");
const path = require("path");

module.exports.validate = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(255),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    isActive: Joi.boolean(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "../public/uploads/") + req.file.filename
      );
    }
    return res.status(400).send(error.details[0].message);
  }

  next();
};
