const { Schema, model } = require('mongoose');
const Joi = require('joi');

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
    date: {
      type: Schema.Types.Date,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { versionKey: false, timestamps: true }
);

const add = Joi.object({
  categories: Joi.array().required(),
  weight: Joi.number().required(),
  title: Joi.object({ ru: Joi.string(), ua: Joi.string() }),
  calories: Joi.number().required(),
  groupBloodNotAllowed: Joi.array(),
  date: Joi.date(),
});

const schemas = {
  add,
};

const Product = model('product', productSchema);

module.exports = {
  Product,
  schemas,
};
