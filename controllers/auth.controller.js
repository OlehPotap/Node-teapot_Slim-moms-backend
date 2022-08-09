const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {findProductsByBlood} = require('../services/caterories.service')

const { User } = require("../models/user");


const { createError } = require("../helpers");

const { JWT_SECRET } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw createError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });

  const payload = {
    id: result._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(result._id, { token });
  res.status(201).json({
    user: {
      email: result.email,
      name: result.name,
    },
    token
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError(404, "User does not exist");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    user: {
      name: user.name,
      email,
    },
    token,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  if (!user) {
    throw createError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json();
};

const getCurrent = async (req, res) => {
  const  user  = req.user;
  // const user = await User.findById(_id);
  res.json({
   name: user.name,
   email: user.email,
   token: user.token,
   dailyCaloriesRate: user.dailyCaloriesRate,
   forbidenCategories: user.forbidenCategories
  });
};

const updateUserInfo = async (req, res) => {
  
  const { _id } = req.user;
  const { userInfo } = req.body;
  const forbidenCategories = await findProductsByBlood(userInfo.bloodType);
  const calcCalories =
  Math.round(10 * userInfo.currentWeight +
    6.25 * userInfo.height -
    5 * userInfo.age -
    161 -
    10 * (userInfo.currentWeight - userInfo.desiredWeight));
  const user = await User.findByIdAndUpdate(
    _id,
    { $set: { userInfo: userInfo, dailyCaloriesRate: calcCalories, forbidenCategories } },
    { new: true }
  );
  if (!user) {
    throw createError(401, "Not authorized");
  }
  res.json({
    dailyCaloriesRate: user.dailyCaloriesRate,
    userInfo: user.userInfo,
    forbidenCategories: user.forbidenCategories
  });
};

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateUserInfo,
};
