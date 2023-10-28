import React, { useEffect, useState } from 'react';
import {
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
  useMediaQuery,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { currentTabSelector } from 'redux/selectors/appSelectors';
import { Tab, setCurrentTab } from 'redux/reducers/appSlice';

const NavMenu = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(
    `(min-width:${theme.breakpoints.values.xs}px) and (max-width:800px)`
  );
  const isSmall = useMediaQuery(
    `(min-width:801px) and (max-width:${theme.breakpoints.values.md}px)`
  );
  const isMedium = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLarge = useMediaQuery(theme.breakpoints.up('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const currentTab = useSelector(currentTabSelector);
  const tabs = [Tab.Ingredients, Tab.Recipes, Tab.Cake_Costs];

  useEffect(() => {
    navigate(`/${currentTab.toLowerCase().replace(' ', '-')}`);
  }, [currentTab, navigate]);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };

  const list = () => (
    <div
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {tabs.map((text) => (
          <ListItem
            key={text}
            onClick={() => {
              dispatch(setCurrentTab(text));
            }}
          >
            <ListItemText
              primary={text}
              sx={{
                textDecoration: currentTab === text ? 'underline' : 'none',
                textUnderlineOffset: '0.5rem',
              }}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return isMobile ? (
    <Grid
      item
      container
      xs={3}
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
    >
      <IconButton
        disableRipple
        onClick={toggleDrawer(true)}
        sx={{ mr: '1.75rem' }}
      >
        <MenuIcon fontSize='large' />
      </IconButton>
      <Drawer anchor='right' open={drawerOpen} onClose={toggleDrawer(false)}>
        {list()}
      </Drawer>
    </Grid>
  ) : (
    <Grid
      item
      container
      xs={isLarge ? 4 : isMedium ? 5 : isSmall ? 6 : 7}
      mr='2.75rem'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
    >
      {tabs.map((text, index) => (
        <Grid item key={index}>
          <Typography
            variant='h6'
            sx={{
              textDecoration: currentTab === text ? 'underline' : 'none',
              textUnderlineOffset: '0.5rem',
            }}
            onClick={() => {
              dispatch(setCurrentTab(text));
            }}
          >
            {text}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default NavMenu;
