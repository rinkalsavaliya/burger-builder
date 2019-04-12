import React, { Suspense } from 'react';
import { Layout, withErrorHandler } from './hoc';
import axios from './axios-orders';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Loader } from './components';
import { AsyncBurgerBuilder, AsyncCheckout, AsyncOrders, AsyncAuth } from './async-components';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
  return { isAuthenticated: state.auth.authData.auth };
}

const app = (props) => {
  let routes = (
    <Switch>
      <Route exact path='/' component={AsyncBurgerBuilder}/>
      <Route exact path='/auth' component={AsyncAuth}/>
      <Route render={() => <h1 style={{textAlign:'center'}}>404 NOT FOUND</h1>}/>
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path='/' component={AsyncBurgerBuilder}/>
        <Route path='/checkout' component={AsyncCheckout}/>
        <Route exact path='/orders' component={AsyncOrders}/>
        <Route exact path='/auth' component={AsyncAuth}/>
        <Route render={() => <Redirect to='/'/>}/>
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Suspense fallback={<Loader/>}>{routes}</Suspense>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default connect(mapStateToProps)(withErrorHandler(app, axios));
