import React, { Component } from 'react';
import { Layout, asyncComponent, withErrorHandler } from './hoc';
import axios from './axios-orders';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
const AsyncBurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' component={AsyncBurgerBuilder}/>
              <Route path='/checkout' component={AsyncCheckout}/>
              <Route render={() => <h1 style={{textAlign:'center'}}>404 NOT FOUND</h1>}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default withErrorHandler(App, axios);
