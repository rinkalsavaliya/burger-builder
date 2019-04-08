import React from 'react';
import { Aux } from '../../hoc';
import classes from './Layout.module.css';
import { Toolbar, SideDrawer } from '../../components';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import mapDispatchToProps from '../../store/actions/auth';

const mapStateToProps = (state) => {
  return {...state.auth.authData}
}

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
        <Toolbar auth={this.props.auth} clickDrawerToggle={() => this.toggleSideDrawer(true)}/>
        <SideDrawer auth={this.props.auth} close={() => this.toggleSideDrawer(false)} show={this.state.showSideDrawer}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
        <Route exact path='/logout' render={() => { this.props.onLogout(); return <Redirect to='/auth'/> }}/>
      </Aux>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
