import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axiosBurger from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../store/actions/burgerBuilder';

const mapStateToProps = state => {
  return {
    ...state.burgerBuilder
  }
};

class BurgerBuilder extends React.Component {
  state = {...this.props};
  static getDerivedStateFromProps = (props) => {
    return { ...props };
  }
  purchaseHandler = (value) => {
    this.setState({ ...this.state, purchasing: value });
  }
  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout',
    });
  }
  componentDidMount = async () => {
    try {
      await this.fetchIngredients();
    } catch (e) {
      this.props.onFailGetIngredients();
    }
  }

  fetchIngredients = async () => {
    const ingredientsData = await axiosBurger('/ingredients.json');
    /*
    * sample response :
    *  {
    *   "data": {
    *     "basicPrice": 4,
    *  		"ingredients": [
    *       { "label": "Onion", "price": 0.2, "type": "onion" }, { "label": "Salad", "price": 0.5, "type": "salad" },
    *       { "label": "Tomato", "price": 0.8, "type": "tomato" }, { "label": "Cheese", "price": 0.4, "type": "cheese" },
    *       { "label": "Bacon", "price": 0.7, "type": "bacon" }, { "label": "Meat", "price": 1.3, "type": "meat" }
    *     ]
    *    }
    *  }
    */
    if (ingredientsData && ingredientsData.data && ingredientsData.data.data) {
      const { ingredients, ingredientTypes, basicPrice, totalPrice, ingredientPrices } = this.mapIngredients(ingredientsData.data.data);
      this.props.onGetIngredients({
        ingredientTypes, ingredients, ingredientPrices, basicPrice, totalPrice
      });
    } else {
      this.props.onFailGetIngredients();
    }
  }

  mapIngredients = (ingredientsData) => {
    const ingredients = {};
    const ingredientTypes = [];
    const ingredientPrices = {};
    const basicPrice = ingredientsData.basicPrice;
    let totalPrice = ingredientsData.basicPrice;
    ingredientsData.ingredients.forEach((ingredient) => {
      ingredients[ingredient.type] = this.state.ingredients[ingredient.type] || 0;
      ingredientPrices[ingredient.type] = ingredient.price;
      if (this.state.ingredients[ingredient.type]) {
        totalPrice += ingredientPrices[ingredient.type];
      }
      ingredientTypes.push({ label: ingredient.label, type: ingredient.type })
    });
    return {
      ingredients, ingredientTypes, basicPrice, totalPrice, ingredientPrices
    }
  }

  render() {
    const disableInfo = {...this.state.ingredients};
    return (
      this.state.loading ? <Loader/> :
        !this.state.success ?
          <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> :
          <Aux>
          <div className='burger-wrapper'>
            <Burger ingredients={this.state.ingredients}/>
            <BuildControls
              ingredientTypes={this.state.ingredientTypes}
              purchase={() => this.props.onPurchaseClick({ purchasing: true})}
              purchasable={!this.state.purchasable}
              price={this.state.totalPrice}
              disable={disableInfo}
              addIngredient={this.props.onAddIngredient}
              removeIngredient={this.props.onRemoveIngredient}
            />
          </div>
            <Modal
              show={this.state.purchasing}
              closeModal={() => this.props.onPurchaseClick({ purchasing: false})}>
              <OrderSummary
                ingredients={this.state.ingredients}
                closeModal={() => this.props.onPurchaseClick({ purchasing: false})}
                continuePurchase={this.purchaseContinueHandler}
                totalPrice={this.state.totalPrice}>
              </OrderSummary>
            </Modal>
          </Aux>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder, axiosBurger));
