const { Schema, model } = require("mongoose");

const categorySchema = Schema({
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
  userInfo: {
    // height: 
  },
  groupBloodNotAllowed: {
    type: Array,
  },
});

const Category = model("category", categorySchema);

module.exports = { Category };
