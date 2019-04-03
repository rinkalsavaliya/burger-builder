import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axios from 'axios';
import { config } from '../../config/config';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {},
    ingredientPrices: {},
    ingredientTypes: [],
    totalPrice: 0,
    basicPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: true,
    success: false
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
    state.totalPrice += this.state.ingredientPrices[type];
    state.purchasable = (state.totalPrice > this.state.basicPrice);
    this.setState(state);
  }
  removeIngredientHandler = (type) => {
    const state = {...this.state};
    if (state.ingredients[type]) {
      state.ingredients[type] -= 1;
      state.totalPrice -= this.state.ingredientPrices[type];
      state.purchasable = (state.totalPrice > this.state.basicPrice);
      this.setState(state);
    }
  }
  purchaseHandler = (value) => {
    this.setState({ purchasing: value });
  }
  purchaseContinueHandler = () => {
    alert('You continue...');
  }
  componentDidMount = async () => {
    try {
      const ingredientsData = await axios(`${config.apiUrl}/ingredients`);
      if (ingredientsData && ingredientsData.data && ingredientsData.data.data) {
        const ingredients = {};
        const ingredientTypes = [];
        const ingredientPrices = {};
        ingredientsData.data.data.ingredients.forEach((ingredient) => {
          ingredients[ingredient.type] = 0;
          ingredientPrices[ingredient.type] = ingredient.price;
          ingredientTypes.push({
            label: ingredient.label,
            type: ingredient.type,
          })
        });
        const basicPrice = ingredientsData.data.data.basicPrice;
        this.setState({ ...this.state, ingredientTypes, ingredients, ingredientPrices, basicPrice, totalPrice: basicPrice, loading: false, success: true })
      }
    } catch (e) {
      console.log(e);
      this.setState({ ...this.state, success: false, loading: false })
    }
  }
  render() {
    const disableInfo = {...this.state.ingredients};
    return (
      this.state.loading ? <Loader/> :
        !this.state.success ?
          <p style={{textAlign: 'center'}}>Something Went Wrong</p> :
          <Aux>
          <div className="bugger-wrapper">
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
              ingredientTypes={this.state.ingredientTypes}
              purchase={() => this.purchaseHandler(true)}
              purchasable={!this.state.purchasable}
              price={this.state.totalPrice}
              disable={disableInfo}
              addIngredient={this.addIngredientHandler}
              removeIngredient={this.removeIngredientHandler}
            />
            </div>
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
          </Aux>
    );
  }
}

export default BurgerBuilder;
