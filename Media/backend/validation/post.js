const Joi = require("joi");
const fs = require("fs");
const path = require("path");

module.exports.validate = (req, res, next) => {
  const schema = Joi.object({
    message: Joi.string().required().min(1).max(255),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    if (req.file) {
      fs.unlinkSync(
        path.join(__dirname, "../public/posts/") + req.file.filename
      );
    }
    return res.status(400).send(error.details[0].message);
  }

  next();
};
