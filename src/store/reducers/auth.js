import * as actionTypes from '../actionTypes';
import { setAuth, removeAuth } from '../../lib/helper';

const reducer = {};

reducer[actionTypes.AUTH_INIT] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: true
    }
  };
}

reducer[actionTypes.AUTH_SUCCESS] = (state, action) => {
  setAuth(action.payload);
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      authData: { auth: true },
      error: ''
    }
  };
}

reducer[actionTypes.AUTH_FAIL] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      error: action.payload.error
    }
  };
}

reducer[actionTypes.RESET_AUTH] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      error: ''
    }
  }
}

reducer[actionTypes.AUTH_LOGOUT] = (state, action) => {
  const ingredients = {...state.burgerBuilder.ingredients};
  for (const ingredient in ingredients) {
    ingredients[ingredient] = 0;
  }
  removeAuth();
  return {
    ...state,
    burgerBuilder: {
      ...state.burgerBuilder,
      ingredients,
      totalPrice: state.burgerBuilder.basicPrice,
      purchasable: false
    },
    order: {
      ordering: false,
      error: false
    },
    orders: {
      orders: [],
      loading: true
    },
    auth: {
      loading: false,
      error: '',
      authData: {
        auth: false
      }
    }
  }
}
export default reducer;
