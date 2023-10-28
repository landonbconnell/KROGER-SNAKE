import { Box, Grid, Typography, useTheme, useMediaQuery } from '@mui/material';
import React from 'react';
import StyledButton from 'components/misc/StyledButton';
import { useDispatch, useSelector } from 'react-redux';
import { newIngredientSelector } from 'redux/selectors/ingredientSelectors';
import {
  addSavedIngredient,
  resetNewIngredient,
  setSavedIngredientProducts,
} from 'redux/reducers/ingredientSlice';
import { setPreferredProducts } from 'api/kroger/products';
import ProductsCarousel from './ProductsCarousel';

const NewIngredient = () => {
  const dispatch = useDispatch();
  const newIngredient = useSelector(newIngredientSelector);
  const { name, selectedProducts, products } = newIngredient;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  const save = () => {
    const selectedProductData = products.filter((product) =>
      selectedProducts.includes(product.id)
    );
    setPreferredProducts(name, selectedProducts);
    dispatch(addSavedIngredient({ name, productIds: selectedProducts }));
    dispatch(
      setSavedIngredientProducts({
        name,
        products: selectedProductData,
      })
    );
    dispatch(resetNewIngredient());
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <Box width='100%' boxShadow={3} bgcolor='primary.dark' mt='0.25rem'>
        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          p='1rem 0 1rem 2rem'
          color='secondary.main'
        >
          Select preferred {name} :
        </Typography>
      </Box>

      <ProductsCarousel
        selectedProducts={selectedProducts}
        products={products}
      />

      <Grid
        mb='2rem'
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={5}
      >
        <Grid item>
          <StyledButton
            label='Cancel'
            onClick={() => dispatch(resetNewIngredient())}
          />
        </Grid>
        <Grid item>
          <StyledButton label='Save' onClick={save} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewIngredient;
