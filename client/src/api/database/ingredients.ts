import axios from 'axios';
import { SavedIngredient } from 'redux/reducers/ingredientSlice';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const getIngredients = async () => {
  const { data } = await axios.get(`${REACT_APP_API_URL}/api/ingredients`);
  const parsedData: SavedIngredient[] = [];

  data.forEach((ingredient) => {
    const { name, productIds } = ingredient;
    parsedData.push({ name, productIds, products: [] });
  });

  return parsedData;
};
