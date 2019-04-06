import * as actionTypes from '../action-types';

const reducer = {};

reducer[actionTypes.FETCH_ORDERS] = (state, action) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      orders: action.payload.orders,
      loading: false
    }
  }
}

reducer[actionTypes.FAIL_FETCH_ORDERS] = (state, action) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      loading: false
    }
  }
}

reducer[actionTypes.PLACE_ORDER] = (state, action) => {
  const ingredients = {...state.burgerBuilder.ingredients};
  for (const ingredient in ingredients) {
    ingredients[ingredient] = 0;
  }
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      ingredients,
      totalPrice: state.burgerBuilder.basicPrice,
      purchasable: false
    },
    orders: {
      ...state.orders,
      orders: state.orders.orders.concat(action.payload)
    }
  }
}
export default reducer;
