const express = require("express");

const {
  getAll,
  add,
  remove,
  productController,
} = require("../../controllers/products.controller");

const { ctrlWrapper } = require("../../helpers");

const { validation, authenticate } = require("../../middlewares/middlewares");

const { schemas } = require("../../models/product");

const router = express.Router();

// Мидлвар для получения полного списка для формирования таблицы:
router.get("/", authenticate, ctrlWrapper(getAll));
// Мидлвар для добавления продукта в список.
router.post("/", authenticate, validation(schemas.add), ctrlWrapper(add));
// Мидлвар для удаления продукта (Я не знаю какой указать ендпоинт для этого мидлвара)
router.delete("/", ctrlWrapper(remove));

router.post("/private/daily", ctrlWrapper(productController));

module.exports = router;
