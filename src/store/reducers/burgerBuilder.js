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
  const burgerBuilder = {...state.burgerBuilder};
  burgerBuilder.ingredients[action.payload.ingredientType] += 1;
  burgerBuilder.totalPrice += burgerBuilder.ingredientPrices[action.payload.ingredientType];
  burgerBuilder.purchasable = (burgerBuilder.totalPrice > burgerBuilder.basicPrice);
  return {
    ...state,
    burgerBuilder: {
      ...burgerBuilder
    }
  };
}

reducer[actionTypes.REMOVE_INGREDIENT] = (state, action) => {
  const burgerBuilder = {...state.burgerBuilder};
  burgerBuilder.ingredients[action.payload.ingredientType] -= 1;
  burgerBuilder.totalPrice -= burgerBuilder.ingredientPrices[action.payload.ingredientType];
  burgerBuilder.purchasable = (burgerBuilder.totalPrice > burgerBuilder.basicPrice);
  return {
    ...state,
    burgerBuilder: {
      ...burgerBuilder
    }
  };
}

reducer[actionTypes.PURCHASE] = (state, action) => {
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      purchasing: action.payload.purchasing
    }
  }
}

export default reducer;
