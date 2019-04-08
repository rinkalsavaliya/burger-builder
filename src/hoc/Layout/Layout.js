import React from 'react';
import { Aux } from '../../hoc';
import classes from './Layout.module.css';
import { Toolbar, SideDrawer } from '../../components';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { AUTH_LOGOUT } from '../../store/actionTypes';
import { checkExpiration } from '../../store/actions/auth';

const mapStateToProps = (state) => {
  return {...state.auth.authData}
}

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }
  componentDidMount = () => {
    if (this.props.auth) {
      setTimeout(() => {
        this.props.onCheckAuthTimeout();
      });
    }
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

        <Route exact path='/logout' render={() => {
          this.props.onLogout();
          return <Redirect to='/auth'/>
        }}/>
      </Aux>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch({ type: AUTH_LOGOUT }),
    onCheckAuthTimeout: () => dispatch(checkExpiration())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
