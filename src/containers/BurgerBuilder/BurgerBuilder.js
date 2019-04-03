import React from 'react';
import Aux from '../../hoc/Auxiliary';
import { Burger, BuildControls } from '../../components';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  };
  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
