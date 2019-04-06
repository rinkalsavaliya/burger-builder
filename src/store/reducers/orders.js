import * as actionTypes from '../actionTypes';

const reducer = {};

reducer[actionTypes.FETCH_ORDERS_SUCCESS] = (state, action) => {
  return {
    ...state,
    orders: {
      ...state.orders,
      orders: action.payload.orders,
      loading: false
    }
  }
}

reducer[actionTypes.FETCH_ORDERS_INIT] = (state, action) => {
  return {
    ...state,
    orders: {
      orders: [],
      loading: true
    }
  }
}

reducer[actionTypes.FETCH_ORDERS_FAIL] = (state, action) => {
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
      orders: state.orders.orders.length ? state.orders.orders.concat(action.payload) : []
    },
    order: {
      ordering: false,
      error: false
    }
  }
}

reducer[actionTypes.PLACE_ORDER_INIT] = (state, action) => {
  return {
    ...state,
    order: {
      ordering: true,
      error: false
    }
  }
}

reducer[actionTypes.PLACE_ORDER_FAIL] = (state, action) => {
  return {
    ...state,
    order: {
      ordering: true,
      error: true
    }
  }
}
export default reducer;
