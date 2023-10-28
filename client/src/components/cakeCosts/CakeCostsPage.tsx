import React from 'react';
import Header from 'components/Header';
import { Box } from '@mui/material';

const CakeCostsPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: 'secondary.main',
        overflowX: 'hidden',
      }}
    >
      <Header />
    </Box>
  );
};

export default CakeCostsPage;
