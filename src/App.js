import React, { Component } from 'react';
import { BurgerBuilder, Checkout } from './containers';
import { Layout } from './hoc';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Layout>
            <Switch>
              <Route exact path='/' component={BurgerBuilder}/>
              <Route exact path='/checkout' component={Checkout}/>
            </Switch>
          </Layout>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
