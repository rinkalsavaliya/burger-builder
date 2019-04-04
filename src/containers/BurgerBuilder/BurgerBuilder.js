import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axioBurger from '../../axios-orders';
import { withErrorHandler } from '../../hoc';

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
    this.setState({ ...this.state, ordering: true });
    setTimeout(() => {
      const order = {
        ingredients: this.state.ingredients,
        price: this.state.totalPrice,
        customer: {
          name: 'Rinkal',
          address: {
            street: 'C-103, Shrifal Apartment, Opp. Osia Hypermart',
            landmark: 'Gota',
            city: 'Ahmedabad',
            country: 'India',
            zipCode: '382481'
          },
          email: 'rinkal@scaletech.xyz'
        },
        deliveryMethod: 'fastest'
      }
      axioBurger.post('/orders.json', order)
      .then((response) => {
        this.setState({ ...this.state, ordering: false, purchasing: false });
      }).catch((error) => {
        console.log(error, 'error');
        this.setState({ ...this.state, ordering: false });
      });
    }, 2000);
  }
  componentDidMount = async () => {
    try {
      const ingredientsData = await axioBurger('/ingredients.json');
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

export default withErrorHandler(BurgerBuilder, axioBurger);
