const axios = require('axios');
const Ingredient = require('../../models/ingredientSchema');
const {
  getAccessToken,
} = require('../../services/kroger/refreshKrogerAccessToken');

const kroger_api_url = process.env.KROGER_API_URL;

const searchByTerm = async (req, res) => {
  const access_token = getAccessToken();
  try {
    const { data } = await axios.get(`${kroger_api_url}/products`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      params: {
        'filter.term': req.params.term,
        'filter.locationId': process.env.OUR_KROGER_STORE_ID,
      },
    });

    let products = [];

    for (let i = 0; i < data.data.length; i++) {
      currentProduct = data.data[i];
      if (
        //   currentProduct.productId &&
        //   currentProduct.description &&
        //   currentProduct.images &&
        //   currentProduct.items &&
        currentProduct.items[0].price
        //   currentProduct.items[0].size
      ) {
        let parsedData = parseProductData(currentProduct);
        products.push(parsedData);
      }
    }

    res.status(200).json({ data: products });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const getProductById = async (req, res) => {
  const access_token = getAccessToken();
  try {
    const { data } = await axios.get(
      `${kroger_api_url}/products/${req.params.id}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          'filter.locationId': process.env.OUR_KROGER_STORE_ID,
        },
      }
    );

    const parsedData = parseProductData(data.data);
    res.status(200).json(parsedData);
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
};

const setPreferredProducts = async (req, res) => {
  try {
    const { name, products } = req.body;
    const existingIngredient = await Ingredient.findOne({ name: name });

    if (existingIngredient) {
      existingIngredient.productIds = products;
      await existingIngredient.save();
      res.status(200).json({ message: 'Ingredient updated' });
    } else {
      const newIngredient = new Ingredient({
        name: name,
        productIds: products,
      });
      await newIngredient.save();
      res.status(200).json({ message: 'Ingredient created' });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};

const parseProductData = (currentProduct) => {
  id = currentProduct.productId;
  description = currentProduct.description;
  image = currentProduct.images
    .find((image) => image.perspective === 'front')
    .sizes.find((size) => size.size === 'large').url;
  inventory = currentProduct.items[0].inventory?.stockLevel;
  fulfillment = currentProduct.items[0].fulfillment;
  price = currentProduct.items[0].price;
  size = currentProduct.items[0].size;
  return {
    id,
    description,
    image,
    inventory,
    fulfillment,
    price,
    size,
  };
};

module.exports = { searchByTerm, getProductById, setPreferredProducts };
