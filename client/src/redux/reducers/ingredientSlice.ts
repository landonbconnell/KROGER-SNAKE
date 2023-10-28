import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// create another enum for Dietary Restrictions, but
export interface IngredientState {
  savedIngredients: SavedIngredient[];
  newIngredient: {
    name: string;
    selectedProducts: string[];
    products: Product[];
  };
}

export interface SavedIngredient {
  name: string;
  productIds: string[];
  products: Product[];
}

export interface Product {
  id: string;
  description: string;
  image: string;
  price: {
    regular: number;
    promo: number;
  };
  size: string;
}

const newIngredientInitialState = {
  name: '',
  selectedProducts: [],
  products: [],
};

const initialState: IngredientState = {
  savedIngredients: [],
  newIngredient: newIngredientInitialState,
};

export const ingredientSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setNewIngredientName: (state, action: PayloadAction<string>) => {
      state.newIngredient.name = action.payload;
    },
    setSelectedProducts: (state, action: PayloadAction<string>) => {
      if (state.newIngredient.selectedProducts.includes(action.payload)) {
        state.newIngredient.selectedProducts =
          state.newIngredient.selectedProducts.filter(
            (id) => id !== action.payload
          );
      } else {
        state.newIngredient.selectedProducts.push(action.payload);
      }
    },
    setNewIngredientProducts: (state, action: PayloadAction<Product[]>) => {
      state.newIngredient.products = action.payload;
    },
    resetNewIngredient: (state) => {
      state.newIngredient = newIngredientInitialState;
    },
    addSavedIngredient: (
      state,
      action: PayloadAction<{ name: string; productIds: string[] }>
    ) => {
      state.savedIngredients.push({
        name: action.payload.name,
        productIds: action.payload.productIds,
        products: [],
      });
    },
    setSavedIngredientProducts: (
      state,
      action: PayloadAction<{ name: string; products: Product[] }>
    ) => {
      const { name, products } = action.payload;
      const ingredient = state.savedIngredients.find(
        (ingredient) => ingredient.name === name
      );
      if (ingredient) {
        ingredient.products = products;
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  setNewIngredientName,
  setSelectedProducts,
  setNewIngredientProducts,
  resetNewIngredient,
  addSavedIngredient,
  setSavedIngredientProducts,
} = ingredientSlice.actions;

export default ingredientSlice.reducer;
