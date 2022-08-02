
const Joi = require("joi");

const validation = (schema) => {
    const func = (req, res, next)=> {
        const { error } = schema.validate(req.body);
        if (error) {
            error.status = 400;
            return next(error);
        }
        next();
    }

    return func;
}

const productsDailySchema = Joi.object({
  height: Joi.number().required(),
  age: Joi.number().required(),
  currentWeight: Joi.number().required(),
  desiredWeight: Joi.number().required(),
  bloodType: Joi.number().min(1).max(4).required(),
});

module.exports = { productsDailySchema };
    module.exports = validation;
