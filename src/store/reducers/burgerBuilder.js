import * as actionTypes from '../action-types';

const reducer = {};

reducer[actionTypes.FETCH_INGREDIENTS] = (state, action) => {
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      ingredientTypes: action.payload.ingredientTypes,
      ingredients: action.payload.ingredients,
      ingredientPrices: action.payload.ingredientPrices,
      basicPrice: action.payload.basicPrice,
      totalPrice: action.payload.totalPrice,
      loading: false,
      success: true,
      purchasing: false
    }
  }
}

reducer[actionTypes.FAIL_FETCH_INGREDIENTS] = (state, action) => {
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      success: false,
      loading: false
    }
  }
}

reducer[actionTypes.ADD_INGREDIENT] = (state, action) => {
  const purchasable = ((state.burgerBuilder.totalPrice + state.burgerBuilder.ingredientPrices[action.payload.ingredientType]) > state.burgerBuilder.basicPrice);
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      ingredients: {
        ...state.burgerBuilder.ingredients,
        [action.payload.ingredientType]: state.burgerBuilder.ingredients[action.payload.ingredientType] + 1
      },
      totalPrice: state.burgerBuilder.totalPrice + state.burgerBuilder.ingredientPrices[action.payload.ingredientType],
      purchasable
    }
  };
}

reducer[actionTypes.REMOVE_INGREDIENT] = (state, action) => {
  const purchasable = ((state.burgerBuilder.totalPrice - state.burgerBuilder.ingredientPrices[action.payload.ingredientType]) > state.burgerBuilder.basicPrice);
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      ingredients: {
        ...state.burgerBuilder.ingredients,
        [action.payload.ingredientType]: state.burgerBuilder.ingredients[action.payload.ingredientType] - 1
      },
      totalPrice: state.burgerBuilder.totalPrice - state.burgerBuilder.ingredientPrices[action.payload.ingredientType],
      purchasable
    }
  };
}

export default reducer;
