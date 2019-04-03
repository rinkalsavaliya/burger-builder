import React from 'react';
import Aux from '../../hoc/Auxiliary';
import { Burger, BuildControls, Modal, OrderSummary } from '../../components';

const INGREDIENT_PRICES = { salad: 0.5, cheese: 0.4, meat: 1.3, bacon: 0.7 }

const BASIC_PRICE = 4;

class BurgerBuilder extends React.Component {
  state = {
    ingredients: { salad: 0, bacon: 0, cheese: 0, meat: 0 },
    totalPrice: BASIC_PRICE,
    purchasable: false,
    purchasing: false
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
  purchaseHandler = (value) => {
    this.setState({ purchasing: value })
  }
  purchaseContinueHandler = () => {
    alert('You continue...');
  }
  render() {
    const disableInfo = {...this.state.ingredients};
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={() => this.purchaseHandler(false)}>
            <OrderSummary
              ingredients={this.state.ingredients}
              closeModal={() => this.purchaseHandler(false)}
              continuePurchase={this.purchaseContinueHandler}
              totalPrice={this.state.totalPrice}>
            </OrderSummary>
        </Modal>

        <Burger ingredients={this.state.ingredients}/>

        <BuildControls
          purchase={() => this.purchaseHandler(true)}
          purchasable={!this.state.purchasable}
          price={this.state.totalPrice}
          disable={disableInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
