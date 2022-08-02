const Joi = require("joi");

const productsDailySchema = Joi.object({
  height: Joi.number().required(),
  age: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().min(1).max(4).required(),
});

module.exports = { productsDailySchema };
