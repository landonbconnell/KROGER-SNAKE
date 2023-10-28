import React from 'react';

// Import necessary Material-UI components
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { newRecipeSelector } from 'redux/selectors/recipeSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { setNewRecipeIngredientUnit } from 'redux/reducers/recipeSlice';

const SelectUnit = ({ index }) => {
  const dispatch = useDispatch();
  const units = ['cup', 'tsp', 'tbsp', 'oz', 'lb', 'g', 'kg', 'ml', 'l'];
  const { ingredients } = useSelector(newRecipeSelector);
  const selectedUnit = ingredients[index].unit;

  const handleChange = (event) => {
    dispatch(setNewRecipeIngredientUnit({ index, unit: event.target.value }));
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id='ingredient-select-label'>Unit</InputLabel>
        <Select
          labelId='unit-select-label'
          value={selectedUnit}
          onChange={handleChange}
          label='Unit'
        >
          {units.map((unit, index) => (
            <MenuItem key={index} value={unit}>
              {unit}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectUnit;
