import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setNewRecipeIngredientQuantity } from 'redux/reducers/recipeSlice';
import { newRecipeSelector } from 'redux/selectors/recipeSelectors';

interface SetQuantityProps {
  index: number;
}

const SetQuantity = ({ index }: SetQuantityProps) => {
  const dispatch = useDispatch();
  const newRecipe = useSelector(newRecipeSelector);
  const { quantity } = newRecipe.ingredients[index];
  const [error, setError] = useState(false);

  const handleChange = (event) => {
    setError(false);
    const quantity = event.target.value;
    if (!isNaN(parseFloat(quantity))) {
      dispatch(
        setNewRecipeIngredientQuantity({
          index,
          quantity: quantity,
        })
      );
    } else {
      dispatch(setNewRecipeIngredientQuantity({ index, quantity: '' }));
    }
  };

  return (
    <TextField
      label='Qty'
      error={error}
      value={quantity}
      onChange={(event) => handleChange(event)}
      fullWidth
    />
  );
};

export default SetQuantity;
