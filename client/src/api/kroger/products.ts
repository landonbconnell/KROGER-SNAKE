import axios from "axios";

const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

export const searchProductsByTerm = async (term: string) => {
  const products = await axios.get(
    `${REACT_APP_API_URL}/api/kroger/products/search/${term}`
  );
  return products.data;
};

export const getProductById = async (id: string) => {
  const product = await axios.get(
    `${REACT_APP_API_URL}/api/kroger/products/${id}`
  );
  return product.data;
};

export const getProductsById = async (ids: string[]) => {
  let productPromises = ids.map((id) => getProductById(id));
  const products = await Promise.all(productPromises);
  return products;
};

export const setPreferredProducts = async (
  name: string,
  products: string[]
) => {
  axios.post(`${REACT_APP_API_URL}/api/kroger/products/setPreferred`, {
    name,
    products,
  });
};
