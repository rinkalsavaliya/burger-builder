import { burgerBuilderActions, ordersActions, authActions } from './reducers';

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
    authData: {}
  }
};

const actions = {
  ...burgerBuilderActions,
  ...ordersActions,
  ...authActions
}

const reducer = (state = initialState, action) => {
  console.log('ACTION DISPATCHED: ', action);
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

export default reducer;
