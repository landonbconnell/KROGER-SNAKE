const Ingredient = require('../models/ingredientSchema');

const getIngredients = async (req, res) => {
  try {
    const products = await Ingredient.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getIngredients };
