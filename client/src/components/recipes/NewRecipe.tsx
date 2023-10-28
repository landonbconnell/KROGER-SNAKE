import React from 'react';
import { Grid, TextField, useMediaQuery, useTheme } from '@mui/material';
import RecipeIngredient from './RecipeIngredient';
import { useDispatch, useSelector } from 'react-redux';
import { newRecipeSelector } from 'redux/selectors/recipeSelectors';
import { setNewRecipeName } from 'redux/reducers/recipeSlice';
import AddRecipeIngredient from './AddRecipeIngredient';

const NewRecipe = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const newRecipe = useSelector(newRecipeSelector);

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <TextField
        label='Recipe Name'
        onChange={(event) => dispatch(setNewRecipeName(event.target.value))}
        sx={{
          width: isMobile ? 'calc(100% - 4rem)' : '29.5rem',
          m: '1rem 0 1.5rem 0',
        }}
      />

      {newRecipe.ingredients.map((ingredient, index) => (
        <RecipeIngredient index={index} key={index} />
      ))}

      <AddRecipeIngredient />
    </Grid>
  );
};

export default NewRecipe;
