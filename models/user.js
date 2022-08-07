const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegexp,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    token: {
      type: String,
      default: "",
    },
    dailyCaloriesRate: {
      type: Number,
      default: 0,
    },
    userInfo: {
      age: {
        type: Number,
        default: null,
      },
      bloodType: {
        type: String,
        default: null,
      },
      currentWeight: {
        type: Number,
        default: null,
      },
      desiredWeight: {
        type: Number,
        default: null,
      },
      height: {
        type: Number,
        default: null,
      },
    },
    forbidenCategories: [String],
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

const register = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const login = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

const schemas = {
  register,
  login,
};

module.exports = {
  User,
  schemas,
};
