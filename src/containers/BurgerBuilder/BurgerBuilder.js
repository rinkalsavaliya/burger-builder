import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axiosBurger from '../../axios-orders';
import { withErrorHandler } from '../../hoc';
import { withRouter } from 'react-router-dom';

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
    success: false,
    ordering: false
  };
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
    // this.setState({ ...this.state, ordering: true });
    // setTimeout(() => {
    //   const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //       name: 'Rinkal',
    //       address: {
    //         street: 'C-103, Shrifal Apartment, Opp. Osia Hypermart',
    //         landmark: 'Gota',
    //         city: 'Ahmedabad',
    //         country: 'India',
    //         zipCode: '382481'
    //       },
    //       email: 'rinkal@scaletech.xyz'
    //     },
    //     deliveryMethod: 'fastest'
    //   }
    //   axiosBurger.post('/orders.json', order)
    //   .then((response) => {
    //     this.setState({ ...this.state, ordering: false, purchasing: false });
    //   }).catch((error) => {
    //     console.log(error, 'error');
    //     this.setState({ ...this.state, ordering: false });
    //   });
    // }, 2000);
    this.props.history.push('/checkout');
  }
  componentDidMount = async () => {
    try {
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
      } else {
        this.setState({ ...this.state, success: false, loading: false })
      }
    } catch (e) {
      console.log('get ingredients ERROR: ', e);
      this.setState({ ...this.state, success: false, loading: false })
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
                {
                  this.state.ordering ? <Loader/> :
                  <OrderSummary
                    ingredients={this.state.ingredients}
                    closeModal={() => this.purchaseHandler(false)}
                    continuePurchase={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice}>
                  </OrderSummary>
                }
            </Modal>
          </Aux>
    );
  }
}

export default withRouter(withErrorHandler(BurgerBuilder, axiosBurger));
