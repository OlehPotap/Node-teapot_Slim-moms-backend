const express = require("express");

const {
  getAll,
  addDiary,
  deleteProduct,
//   productController,
} = require("../../controllers/diary.controller");

const { ctrlWrapper } = require("../../helpers");

const { 
    // validation,
     authenticate } = require("../../middlewares");

// const { schemas } = require("../../models/diary");

const router = express.Router();

// Мидлвар для получения полного списка для формирования таблицы:
router.get("/:date", authenticate, ctrlWrapper(getAll));
// Мидлвар для добавления продукта в список.
router.post("/add", authenticate,
//  validation(schemas.add), 
 ctrlWrapper(addDiary));
// Мидлвар для удаления продукта (Я не знаю какой указать ендпоинт для этого мидлвара)
router.patch("/delete",authenticate, ctrlWrapper(deleteProduct));

module.exports = router;