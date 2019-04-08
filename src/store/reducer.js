import { burgerBuilderActions, ordersActions, authActions } from './reducers';
import { getToken } from '../lib/helper';
import { NO_ACTION } from './actionTypes';

const initialState = {
  burgerBuilder: {
    ingredients: {},
    ingredientPrices: {},
    ingredientTypes: [],
    totalPrice: 0,
    basicPrice: 0,
    purchasable: false,
    loading: true,
    success: false
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
      auth: Boolean(getToken())
    }
  }
};

const actions = {
  ...burgerBuilderActions,
  ...ordersActions,
  ...authActions
}

actions[NO_ACTION] = (state) => {
  return state;
}

const reducer = (state = initialState, action) => {
  console.log('ACTION DISPATCHED: ', action);
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

export default reducer;
