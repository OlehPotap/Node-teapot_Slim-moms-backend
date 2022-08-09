const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { createError } = require("../helpers");

const { JWT_SECRET } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw createError(401, "Unautorized");
    }
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(id);
      if (user.token !== token) {
        throw createError(401, "Unautorized");
      }
      req.user = user;
      next();
    } catch (error) {
      throw createError(401, "Unautorized");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
