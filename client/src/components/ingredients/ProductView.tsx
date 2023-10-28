import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Product, setSelectedProducts } from 'redux/reducers/ingredientSlice';

interface ProductViewProps {
  selectedProducts?: string[];
  product: Product;
}

const ProductView = ({ selectedProducts, product }: ProductViewProps) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSelectable = selectedProducts ? true : false;
  const { id, description, image, price, size } = product;

  return (
    <Card
      sx={{
        boxShadow: 3,
        maxWidth: 250,
        margin: '2rem',
        color: 'primary.contrastText',
        border:
          isSelectable && selectedProducts!.includes(id)
            ? `solid ${theme.palette.primary.dark}`
            : 'solid transparent',
      }}
    >
      <CardActionArea
        onClick={() => isSelectable && dispatch(setSelectedProducts(id))}
        disableRipple
      >
        <CardMedia
          component='img'
          alt={description}
          sx={{
            objectFit: 'contain',
            width: 250,
            height: 250,
          }}
          image={image}
        />
        <CardContent>
          {price.promo > 0 ? (
            <Typography gutterBottom variant='h6' component='div'>
              <mark>{price.promo}</mark> <del>{price.regular}</del>
            </Typography>
          ) : (
            <Typography gutterBottom variant='h6' component='div'>
              {price.regular}
            </Typography>
          )}
          <Typography gutterBottom variant='body1' component='div'>
            {description}
          </Typography>
          <Typography gutterBottom variant='body1' component='div'>
            {size}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductView;
