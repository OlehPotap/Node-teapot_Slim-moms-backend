const { Schema, model } = require("mongoose");
// const Joi = require("joi");

// const title = {ru, ua};

const listedProductSchema = Schema(
  {
    categories: {
      type: String,
    },
    weight: {
      type: Number,
    },
    title: {
      ru: {
        type: String,
      },
      ua: {
        type: String,
      },
    },
    calories: {
      type: Number,
    },
    groupBloodNotAllowed: {
      type: Array,
    },
  },
);

// const addListedProduct = Joi.object({
//   categories: Joi.string().required(),
//   weight: Joi.string.required(),
//   title: Joi.object({ ru: Joi.string(), ua: Joi.string() }),
//   calories: Joi.number().required(),
// //   ???
// //   groupBloodNotAllowed: Joi.array().items(Joi.bool()).sparse()
// //   ???
// groupBloodNotAllowed: Joi.array()
// });

// const schemas = {
//     addListedProduct,
// };

const ListedProduct = model("category", listedProductSchema);

module.exports = {
    ListedProduct,
//   schemas,
};
