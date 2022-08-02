const { Category } = require("../models/categories");
const { User } = require("../models/user");

const findProductsByBlood = async (bloodType) => {
  const findProducts = await Category.find({
    groupBloodNotAllowed: { $in: [true] },
  });

  const productsCategories = findProducts.reduce((acc, product) => {
    return product.groupBloodNotAllowed[bloodType] === true
      ? [...acc, product.categories[0]]
      : acc;
  }, []);

  return Array.from(new Set(productsCategories));
};

const updateInfo = async ({ id, dailyCalories, forbidenCategories }) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("Not authorized");
  }
  await User.findByIdAndUpdate({ id, dailyCalories, forbidenCategories });
};

module.exports = { findProductsByBlood, updateInfo };
