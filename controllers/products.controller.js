const { Product } = require("../models/product");
const { productsDailySchema } = require("../middlewares/validation");
const {
  findProductsByBlood,
  updateInfo,
} = require("../services/productsService");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Product.create({ ...req.body, owner });
  res.status(201).json(result);
};

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Product.find({ owner });
  res.json(result);
};

const remove = async (req, res) => {};

const productController = async (req, res, next) => {
  const { value, error } = productsDailySchema.validate(req.body);
  const { height, age, currentWeight, desiredWeight, bloodType } = value;

  if (error) {
    res.status(400).json({ message: error.message });
  }

  const dailyCalories = parseInt(
    10 * currentWeight +
      6.25 * height -
      5 * age -
      161 -
      10 * (currentWeight - desiredWeight)
  );

  const forbidenCategories = await findProductsByBlood(bloodType);
  if (req.user) {
    const { _id: id } = req.user;
    await updateInfo({ id, dailyCalories, forbidenCategories });
  }

  res.status(200).json({
    dailyCalories,
    forbidenCategories,
  });
};

module.exports = {
  add,
  getAll,
  remove,
  productController,
};
