const express = require("express");

const {
  register,
  login,
  logout,
  getCurrent,
} = require("../../controllers/auth.controller");

const { ctrlWrapper } = require("../../helpers");

const { validation, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/register", validation(schemas.register), ctrlWrapper(register));

// signin
router.post("/login", validation(schemas.login), ctrlWrapper(login));

router.get("/current", authenticate, ctrlWrapper(getCurrent));

router.get("/logout", authenticate, ctrlWrapper(logout));

module.exports = router;
