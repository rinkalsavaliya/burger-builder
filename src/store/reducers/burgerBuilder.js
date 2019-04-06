import * as actionTypes from '../actionTypes';

const reducer = {};

/**
 * Fetch Ingredients from server
 * return all available ingredients, and their respective prices, with base-price fetched from server
 */
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

/**
 * when Fetch Ingredients from server fails
 * it sets success and loading as false
 */
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

/**
 * Add Ingredient
 * returns added given ingredient from the list, with updating total price and purchasable status accordingly
 */
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

/**
 * Remove Ingredient
 * returns removed given ingredient from the list, with updating total price and purchasable status accordingly
 */
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
