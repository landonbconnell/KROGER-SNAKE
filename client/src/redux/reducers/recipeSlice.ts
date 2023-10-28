import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface RecipeState {
  items: Recipe[];
  newRecipe: Recipe;
}

export interface Recipe {
  name: string;
  ingredients: Ingredient[];
  makes: Round_Cake | Rectangular_Cake | Cupcake | null;
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Round_Cake {
  shape: Shape.Round;
  size: {
    diameter: string;
    unit: Unit | null;
  };
}

export interface Rectangular_Cake {
  shape: Shape.Rectangular;
  size: {
    length: string;
    width: string;
    unit: Unit | null;
  };
}

export interface Cupcake {
  shape: Shape.Cupcake;
  quantity: string;
}

export enum Shape {
  Round = 'round',
  Rectangular = 'rectangular',
  Cupcake = 'cupcake',
}

export enum Unit {
  Inch = 'in',
  Centimeter = 'cm',
}

const initialState: RecipeState = {
  items: [],
  newRecipe: {
    name: '',
    ingredients: [
      {
        name: '',
        quantity: '',
        unit: '',
      },
    ],
    makes: null,
  },
};

export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    addRecipe: (state, action: PayloadAction<Recipe>) => {
      state.items.push(action.payload);
    },
    setNewRecipeName: (state, action: PayloadAction<string>) => {
      state.newRecipe.name = action.payload;
    },
    addNewRecipeIngredient: (state) => {
      state.newRecipe.ingredients.push({
        name: '',
        quantity: '',
        unit: '',
      });
    },
    removeNewRecipeIngredient: (state, action: PayloadAction<number>) => {
      state.newRecipe.ingredients.splice(action.payload, 1);
    },
    setNewRecipeIngredientName: (
      state,
      action: PayloadAction<{ index: number; name: string }>
    ) => {
      const { index, name } = action.payload;
      state.newRecipe.ingredients[index].name = name;
    },
    setNewRecipeIngredientQuantity: (
      state,
      action: PayloadAction<{ index: number; quantity: string }>
    ) => {
      const { index, quantity } = action.payload;
      state.newRecipe.ingredients[index].quantity = quantity;
    },
    setNewRecipeIngredientUnit: (
      state,
      action: PayloadAction<{ index: number; unit: string }>
    ) => {
      const { index, unit } = action.payload;
      state.newRecipe.ingredients[index].unit = unit;
    },
    setShape: (state, action: PayloadAction<{ shape: Shape }>) => {
      const { shape } = action.payload;
      switch (shape) {
        case Shape.Round:
          state.newRecipe.makes = {
            shape: Shape.Round,
            size: {
              diameter: '',
              unit: null,
            },
          };
          break;
        case Shape.Rectangular:
          state.newRecipe.makes = {
            shape: Shape.Rectangular,
            size: {
              length: '',
              width: '',
              unit: null,
            },
          };
          break;
        case Shape.Cupcake:
          state.newRecipe.makes = {
            shape: Shape.Cupcake,
            quantity: '',
          };
          break;
      }
    },
    setDiameter: (state, action: PayloadAction<{ diameter: string }>) => {
      const { diameter } = action.payload;
      if (state.newRecipe.makes?.shape === Shape.Round) {
        state.newRecipe.makes.size.diameter = diameter;
      }
    },
    setLength: (state, action: PayloadAction<{ length: string }>) => {
      const { length } = action.payload;
      if (state.newRecipe.makes?.shape === Shape.Rectangular) {
        state.newRecipe.makes.size.length = length;
      }
    },
    setWidth: (state, action: PayloadAction<{ width: string }>) => {
      const { width } = action.payload;
      if (state.newRecipe.makes?.shape === Shape.Rectangular) {
        state.newRecipe.makes.size.width = width;
      }
    },
    setQuantity: (state, action: PayloadAction<{ quantity: string }>) => {
      const { quantity } = action.payload;
      if (state.newRecipe.makes?.shape === Shape.Cupcake) {
        state.newRecipe.makes.quantity = quantity;
      }
    },
    setUnit: (state, action: PayloadAction<{ unit: Unit }>) => {
      const { unit } = action.payload;
      if (state.newRecipe.makes?.shape === Shape.Round) {
        state.newRecipe.makes.size.unit = unit;
      } else if (state.newRecipe.makes?.shape === Shape.Rectangular) {
        state.newRecipe.makes.size.unit = unit;
      }
    },
  },
});

// Action creators are generated for each case reducer function

export const {
  addRecipe,
  setNewRecipeName,
  addNewRecipeIngredient,
  removeNewRecipeIngredient,
  setNewRecipeIngredientName,
  setNewRecipeIngredientQuantity,
  setNewRecipeIngredientUnit,
  setShape,
  setDiameter,
  setLength,
  setWidth,
  setQuantity,
  setUnit,
} = recipeSlice.actions;

export default recipeSlice.reducer;
