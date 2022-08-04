const express = require("express");

const {
    findOne,
    findAll
} = require("../../controllers/categories.controller");

const {ctrlWrapper} = require("../../helpers");

const router = express.Router();


router.get("/:id", ctrlWrapper(findOne));

router.get("/", ctrlWrapper(findAll));


module.exports = router;