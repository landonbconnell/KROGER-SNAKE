import React from 'react';
import { Grid, IconButton, Typography, useMediaQuery } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material';

const SavedIngredientHeader = ({ name, isExpanded, onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

  return (
    <Grid
      container
      onClick={onClick}
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      bgcolor='primary.dark'
      mt='0.25rem'
    >
      <Typography
        variant={isMobile ? 'h6' : 'h5'}
        p='1rem 0 1rem 2rem'
        color='secondary.main'
      >
        {name}
      </Typography>
      <IconButton disableRipple edge='end' sx={{ mr: '2rem' }}>
        {isExpanded ? (
          <ExpandMoreIcon sx={{ color: 'secondary.main' }} />
        ) : (
          <ExpandLessIcon sx={{ color: 'secondary.main' }} />
        )}
      </IconButton>
    </Grid>
  );
};

export default SavedIngredientHeader;
