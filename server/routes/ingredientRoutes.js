const express = require('express');
const { getIngredients } = require('../controllers/ingredientControllers');
const router = express.Router();

router.get('/', getIngredients);

module.exports = router;
