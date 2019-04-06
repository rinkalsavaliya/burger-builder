import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axiosBurger from '../../axios-orders';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../store/actions/burgerBuilder';

const mapStateToProps = state => {
  return {...state.burgerBuilder};
};

class BurgerBuilder extends React.Component {
  state = { purchasing: false };
  purchaseHandler = (value) => {
    this.setState({ purchasing: value.purchasing });
  }
  purchaseContinueHandler = () => {
    this.props.history.push({
      pathname: '/checkout',
    });
  }
  componentDidMount = async () => {
    try {
      if (Object.keys(this.props.ingredients).length === 0) {
        await this.fetchIngredients();
      }
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
      this.props.onFetchIngredients(this.mapIngredients(ingredientsData.data.data));
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
      ingredients[ingredient.type] = this.props.ingredients[ingredient.type] || 0;
      ingredientPrices[ingredient.type] = ingredient.price;
      if (this.props.ingredients[ingredient.type]) {
        totalPrice += ingredientPrices[ingredient.type];
      }
      ingredientTypes.push({ label: ingredient.label, type: ingredient.type });
    });
    return {
      ingredients, ingredientTypes, basicPrice, totalPrice, ingredientPrices
    }
  }

  render() {
    const disableInfo = {...this.props.ingredients};
    return (
      this.props.loading ? <Loader/> :
        !this.props.success ?
          <p style={{textAlign: 'center'}}>Ingredients can't be loaded</p> :
          <Aux>
          <div className='burger-wrapper'>
            <Burger ingredients={this.props.ingredients}/>
            <BuildControls
              ingredientTypes={this.props.ingredientTypes}
              purchase={() => this.purchaseHandler({ purchasing: true})}
              purchasable={!this.props.purchasable}
              price={this.props.totalPrice}
              disable={disableInfo}
              addIngredient={this.props.onAddIngredient}
              removeIngredient={this.props.onRemoveIngredient}
            />
          </div>
            <Modal
              show={this.state.purchasing}
              closeModal={() => this.purchaseHandler({ purchasing: false})}>
              <OrderSummary
                ingredients={this.props.ingredients}
                closeModal={() => this.purchaseHandler({ purchasing: false})}
                continuePurchase={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}>
              </OrderSummary>
            </Modal>
          </Aux>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder, axiosBurger));
