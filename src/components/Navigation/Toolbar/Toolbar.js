import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle click={props.clickDrawerToggle}/>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems auth={props.auth}/>
      </nav>
    </header>
  );
}
export default toolbar;
