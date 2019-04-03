import React from 'react';
import Aux from '../../hoc/Auxiliary';
import { Burger, BuildControls } from '../../components';

const INGREDIENT_PRICES = { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 }

const BASIC_PRICE = 4;

class BurgerBuilder extends React.Component {
  state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: BASIC_PRICE,
    purchasable: false
  };
  // call after addIngredient/removeIngredient (optional)
  updatePurchaseState = () => {
    const ingredients = {...this.state.ingredients};
    const sum = Object.keys(ingredients).map(igKey => ingredients[igKey]).reduce((ig1, ig2) => ig1 + ig2);
    this.setState({ purchasable: sum > 0 });
  }
  addIngredientHandler = (type) => {
    const state = {...this.state};
    state.ingredients[type] += 1;
    state.totalPrice += INGREDIENT_PRICES[type];
    state.purchasable = (state.totalPrice > BASIC_PRICE);
    this.setState(state);
  }
  removeIngredientHandler = (type) => {
    const state = {...this.state};
    if (state.ingredients[type]) {
      state.ingredients[type] -= 1;
      state.totalPrice -= INGREDIENT_PRICES[type];
      state.purchasable = (state.totalPrice > BASIC_PRICE);
      this.setState(state);
    }
  }
  render() {
    const disableInfo = {...this.state.ingredients};
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls purchasable={!this.state.purchasable} price={this.state.totalPrice} disable={disableInfo} addIngredient={this.addIngredientHandler} removeIngredient={this.removeIngredientHandler}/>
      </Aux>
    );
  }
}

export default BurgerBuilder;
