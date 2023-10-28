import { useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const theme = useTheme();

export const breakpoints = {
  isMobile: useMediaQuery(theme.breakpoints.between('xs', 'sm')),
  isSmall: useMediaQuery(theme.breakpoints.between('sm', 'md')),
  isMedium: useMediaQuery(theme.breakpoints.between('md', 'lg')),
  isLarge: useMediaQuery(theme.breakpoints.between('lg', 'xl')),
  isXLarge: useMediaQuery(theme.breakpoints.up('xl')),
};

export const getProductsPerRow = () => {
  if (breakpoints.isMobile) return 1;
  if (breakpoints.isSmall) return 2;
  if (breakpoints.isMedium) return 3;
  if (breakpoints.isLarge) return 4;
  if (breakpoints.isXLarge) return 5;
};
