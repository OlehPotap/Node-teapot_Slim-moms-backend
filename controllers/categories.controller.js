const { Category } = require('../models/categories');

const findOne = async (req, res) => {
  const { _id } = req.params;
  const result = await Category.findOne({ _id });
  res.status(200).json(result);
};

const findAll = async (req, res, next) => {
  try {
    const result = await Category.find({});
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findOne,
  findAll,
};
