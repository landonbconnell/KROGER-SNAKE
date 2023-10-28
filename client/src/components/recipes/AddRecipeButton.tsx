import React from 'react';
import { Grid, useTheme, useMediaQuery } from '@mui/material';
import StyledButton from 'components/misc/StyledButton';

const AddRecipeButton = ({ setIsAddingRecipe }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <Grid
      container
      direction='row'
      justifyContent='center'
      alignItems='center'
      mt='2rem'
      mb='2rem'
    >
      <StyledButton
        label='Add Recipe'
        onClick={setIsAddingRecipe(true)}
        styles={{
          width: isMobile ? '100%' : '20rem',
          ml: isMobile ? '2rem' : 0,
          mr: isMobile ? '2rem' : 0,
          height: '3.5rem',
          fontSize: '1.25rem',
        }}
      />
    </Grid>
  );
};

export default AddRecipeButton;
