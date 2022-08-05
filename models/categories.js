const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
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

const Category = mongoose.model('category', categorySchema);

module.exports = { Category };
