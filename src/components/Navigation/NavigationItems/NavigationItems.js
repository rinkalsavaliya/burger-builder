import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      {props.auth && <NavigationItem link='/orders'>Orders</NavigationItem>}
      {
        props.auth ? <NavigationItem link='/logout'>Logout</NavigationItem> :
        <NavigationItem link='/auth'>Login/Signup</NavigationItem>
      }
    </ul>
  )
};

export default navigationItems;
