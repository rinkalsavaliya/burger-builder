import React, { Component } from 'react';
import { Layout, withErrorHandler } from './hoc';
import axios from './axios-orders';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { AsyncBurgerBuilder, AsyncCheckout, AsyncOrders, AsyncAuth } from './async-components';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' component={AsyncBurgerBuilder}/>
              <Route path='/checkout' component={AsyncCheckout}/>
              <Route exact path='/orders' component={AsyncOrders}/>
              <Route exact path='/auth' component={AsyncAuth}/>
              <Route render={() => <h1 style={{textAlign:'center'}}>404 NOT FOUND</h1>}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default withErrorHandler(App, axios);
