const { Schema, model } = require("mongoose");
const Joi = require("joi");

// const title = {ru, ua};

const productSchema = Schema(
  {
    categories: {
      type: Array,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const add = Joi.object({
  //   categories: Joi.string().required(),
  //   weight: Joi.string.required(),
  //   title: Joi.object({ ru: Joi.string(), ua: Joi.string() }),
  //   calories: Joi.number().required(),
  // //   ???
  // //   groupBloodNotAllowed: Joi.array().items(Joi.bool()).sparse()
  // //   ???
  // groupBloodNotAllowed: Joi.array()
});

const schemas = {
  add,
};

const Product = model("product", productSchema);

module.exports = {
  Product,
  schemas,
};
