import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  console.log(props.auth);
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
      {
        props.auth ? <NavigationItem link='/logout'>Logout</NavigationItem> :
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
      }
    </ul>
  )
};

export default navigationItems;
