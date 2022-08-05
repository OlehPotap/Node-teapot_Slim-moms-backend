const express = require('express');

const { findOne, findAll } = require('../../controllers/categories.controller');

const { ctrlWrapper } = require('../../helpers');

const categoriesRouter = express.Router();

categoriesRouter.get('/:id', ctrlWrapper(findOne));

categoriesRouter.get('/', ctrlWrapper(findAll));

module.exports = categoriesRouter;
