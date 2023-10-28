const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  productIds: {
    type: Array,
    required: true,
    items: {
      type: String,
    },
  },
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);
module.exports = Ingredient;
