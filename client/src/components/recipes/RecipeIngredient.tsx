import React from 'react';
import SelectIngredient from './SelectIngredient';
import { Grid, useTheme, useMediaQuery, IconButton } from '@mui/material';
import SelectUnit from './SelectUnit';
import SetQuantity from './SetQuantity';
import MobileIngredient from './MobileIngredient';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { newRecipeSelector } from 'redux/selectors/recipeSelectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { removeNewRecipeIngredient } from 'redux/reducers/recipeSlice';

interface RecipeIngredientProps {
  index: number;
}

const RecipeIngredient = ({ index }: RecipeIngredientProps) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const { ingredients } = useSelector(newRecipeSelector);

  const handleDelete = () => {
    if (ingredients.length > 1) {
      dispatch(removeNewRecipeIngredient(index));
    }
  };

  return (
    <Grid container justifyContent='center' mb='1rem'>
      {isMobile ? (
        <MobileIngredient index={index} />
      ) : (
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          maxWidth='30rem'
          spacing={1}
        >
          <Grid item xs={6}>
            <SelectIngredient index={index} />
          </Grid>
          <Grid item xs={2.5}>
            <SetQuantity index={index} />
          </Grid>
          <Grid item xs={2.5}>
            <SelectUnit index={index} />
          </Grid>
          <Grid item xs={1}>
            <IconButton
              disableRipple
              disabled={ingredients.length <= 1}
              edge='start'
              onClick={handleDelete}
            >
              <DeleteOutlineIcon fontSize='large' />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default RecipeIngredient;
