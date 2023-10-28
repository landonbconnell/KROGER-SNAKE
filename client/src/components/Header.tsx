import React from 'react';
import { useTheme, Grid, Typography, useMediaQuery } from '@mui/material';
import NavMenu from './NavMenu';
import { useSelector } from 'react-redux';
import { currentTabSelector } from 'redux/selectors/appSelectors';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(
    `(min-width:${theme.breakpoints.values.xs}px) and (max-width:800px)`
  );

  const currentTab = useSelector(currentTabSelector);

  return (
    <Grid
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      <Grid
        item
        container
        xs={isMobile ? 9 : 5}
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
      >
        <Typography
          variant='h4'
          gutterBottom={!isMobile}
          sx={{ p: '1rem 0 0 2rem' }}
        >
          Nicole's Tools
        </Typography>
        {isMobile && (
          <Typography variant={'h6'} sx={{ p: '0 0 1rem 2rem' }}>
            {currentTab}
          </Typography>
        )}
      </Grid>

      <NavMenu />
    </Grid>
  );
};

export default Header;
