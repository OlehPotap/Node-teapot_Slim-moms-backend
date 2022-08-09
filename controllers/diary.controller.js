const { Dairy } = require("../models/diary");
const { createError } = require("../helpers");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { date } = req.params;
  console.log(owner, date);
  const result = await Dairy.findOne({ date, owner });
  res.json(result);
};

const addDiary = async (req, res) => {
  const { _id: owner } = req.user;

  const { date, product } = req.body;

  const result = await Dairy.findOne({ date, owner });
  if (!result) {
    const diary = await Dairy.create({
      date,
      owner,
      productList: [product],
      caloriesReceived: product.calories,
    });
    return res.json(diary);
  } else {
    const newProductList = [...result.productList, product];
    // newProductList.push(product)
    const newCaloriesReceived = result.caloriesReceived + product.calories;
    const newDiary = await Dairy.findOneAndUpdate(
      { date, owner },
      {
        $set: {
          productList: newProductList,
          caloriesReceived: newCaloriesReceived,
        },
      },
      { new: true, upsert: true }
    );
    res.json(newDiary);
  }
};

const deleteProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { date, _id } = req.body;
  const result = await Dairy.findOne({ date, owner });
  if (!result) {
    throw createError(401, "Does not exist");
  }
  const searchedProduct = result.productList.find((el) => {
    return el._id.toString() !== _id.toString();
  });

  const newProductList = result.productList.filter((el) => {
    return el._id.toString() !== _id.toString();
  });

  let newCaloriesReceived = 0
 if (newProductList.length !== 0) {
  newCaloriesReceived =
  result.caloriesReceived - searchedProduct.calories > 0
    ? result.caloriesReceived - searchedProduct.calories
    : 0;
    // return newCaloriesReceived
 }
  const newDiary = await Dairy.findOneAndUpdate(
    { date, owner },
    {
      $set: {
        productList: newProductList,
        caloriesReceived: newCaloriesReceived,
      },
    },
    { new: true, upsert: true }
  );
  res.json(newDiary);
};

module.exports = {
  getAll,
  addDiary,
  deleteProduct,
};

// const add = async (req, res) => {
//   const { _id: owner } = req.user;
//   const result = await Product.create({ ...req.body, owner });
//   res.status(201).json(result);
// };

// const remove = async (req, res) => {};

// const productController = async (req, res, next) => {
//   const { value, error } = productsDailySchema.validate(req.body);
//   const { height, age, currentWeight, desiredWeight, bloodType } = value;

//   if (error) {
//     res.status(400).json({ message: error.message });
//   }

//   const dailyCalories = parseInt(
//     10 * currentWeight +
//       6.25 * height -
//       5 * age -
//       161 -
//       10 * (currentWeight - desiredWeight)
//   );

//   const forbidenCategories = await findProductsByBlood(bloodType);
//   if (req.user) {
//     const { _id: id } = req.user;
//     await updateInfo({ id, dailyCalories, forbidenCategories });
//   }

//   res.status(200).json({
//     dailyCalories,
//     forbidenCategories,
//   });
// };

// module.exports = {
//   add,
//   getAll,
//   remove,
//   productController,
// };
