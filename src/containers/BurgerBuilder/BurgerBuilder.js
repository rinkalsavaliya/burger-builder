import React from 'react';
import Aux from '../../hoc/Auxiliary';
import { Burger, BuildControls } from '../../components';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4
  };
  addIngredientHandler = (type) => {
    const state = {...this.state};
    state.ingredients[type] += 1;
    state.totalPrice += INGREDIENT_PRICES[type];
    this.setState(state);
  }
  removeIngredientHandler = (type) => {
    const state = {...this.state};
    if (state.ingredients[type]) {
      state.ingredients[type] -= 1;
      state.totalPrice -= INGREDIENT_PRICES[type];
      this.setState(state);
    }
  }
  render() {
    const disableInfo = {
      ...this.state.ingredients
    }
    for (const key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls disable={disableInfo} addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
