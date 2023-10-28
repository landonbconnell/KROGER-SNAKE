import React, { useState } from 'react';
import { Grid } from '@mui/material';
import SavedIngredientHeader from './SavedIngredientHeader';
import ProductsCarousel from './ProductsCarousel';

const SavedIngredient = ({ ingredient }) => {
  const { name, products } = ingredient;
  const [isExpanded, setIsExpanded] = useState(false);

  // const fetchData = async () => {
  //   const products = await getProductsById(productIds);
  //   dispatch(setSavedIngredientProducts({ name, products }));
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const handleExpandHeader = async () => {
    setIsExpanded(!isExpanded);
    // if (productIds.length > products.length) {
    //   fetchData();
    // }
  };

  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      <SavedIngredientHeader
        name={name}
        isExpanded={isExpanded}
        onClick={handleExpandHeader}
      />

      {isExpanded && <ProductsCarousel products={products} />}
      {/* Other content that should be shown when expanded can be added here */}
    </Grid>
  );
};

export default SavedIngredient;
