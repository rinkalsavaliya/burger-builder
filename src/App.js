import React, { Component } from 'react';
import { BurgerBuilder } from './containers';
import { Layout } from './hoc';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuilder/>
        </Layout>
      </div>
    );
  }
}

export default App;
