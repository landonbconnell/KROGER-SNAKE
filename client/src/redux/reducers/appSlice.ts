import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
  currentTab: Tab;
}

export enum Tab {
  Ingredients = 'Ingredients',
  Recipes = 'Recipes',
  Cake_Costs = 'Cake Costs',
}

const initialState: AppState = {
  currentTab: Tab.Ingredients,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentTab: (state, action: PayloadAction<Tab>) => {
      state.currentTab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function

export const { setCurrentTab } = appSlice.actions;

export default appSlice.reducer;
