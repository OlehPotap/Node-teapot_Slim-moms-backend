const { ListedProduct } = require("../models/categories");

const findOne = async (req, res) => {
  const { _id } = req.params;
  const result = await ListedProduct.findOne({ _id });
  res.status(200).json(result);
};

const findAll = async (req, res, next) => {
  try {
    const result = await ListedProduct.find({});
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  findOne,
  findAll,
};
