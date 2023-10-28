const express = require('express');
const krogerRoutes = require('./krogerRoutes');
const ingredientRoutes = require('./ingredientRoutes');

const router = express.Router();

router.use('/kroger', krogerRoutes);
router.use('/ingredients', ingredientRoutes);

module.exports = router;
