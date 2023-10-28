import React from 'react';
import { Grid } from '@mui/material';
import ProductView from './ProductView';
import { Product } from 'redux/reducers/ingredientSlice';

interface ProductViewProps {
  selectedProducts?: string[];
  products: Product[];
}

const ProductsCarousel = ({ selectedProducts, products }: ProductViewProps) => {
  return (
    <div
      style={{
        overflowX: 'auto',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      <Grid container direction='row' wrap='nowrap'>
        {products.map((product, index) => (
          <Grid item key={index} style={{ display: 'inline-block' }}>
            <ProductView
              selectedProducts={selectedProducts}
              product={product}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductsCarousel;
