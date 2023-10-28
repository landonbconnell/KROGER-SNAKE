import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { savedIngredientsSelector } from 'redux/selectors/ingredientSelectors';
import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { newRecipeSelector } from 'redux/selectors/recipeSelectors';
import { setNewRecipeIngredientName } from 'redux/reducers/recipeSlice';

interface SelectIngredientProps {
  index: number;
}

const SelectIngredient = ({ index }: SelectIngredientProps) => {
  const dispatch = useDispatch();
  const savedIngredientNames = useSelector(savedIngredientsSelector).map(
    (ingredient) => ingredient.name
  );
  const { ingredients } = useSelector(newRecipeSelector);
  const selectedIngredient = ingredients[index].name;

  const handleChange = (event) => {
    dispatch(setNewRecipeIngredientName({ index, name: event.target.value }));
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='ingredient-select-label'>Ingredient</InputLabel>
        <Select
          labelId='ingredient-select-label'
          value={selectedIngredient}
          onChange={handleChange}
          label='Ingredient'
        >
          {savedIngredientNames.map((ingredientName, index) => (
            <MenuItem key={index} value={ingredientName}>
              {ingredientName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectIngredient;
