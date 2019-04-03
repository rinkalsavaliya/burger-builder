import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }
  toggleSideDrawer = (showSideDrawer) => {
    this.setState({ showSideDrawer });
  }
  render() {
    return (
      <Aux>
        <Toolbar clickDrawerToggle={() => this.toggleSideDrawer(true)}/>
        <SideDrawer close={() => this.toggleSideDrawer(false)} show={this.state.showSideDrawer}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
