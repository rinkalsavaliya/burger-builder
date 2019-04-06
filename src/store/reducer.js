import { burgerBuilderActions, ordersActions } from './reducers';

const initialState = {
  burgerBuilder: {
    ingredients: {},
    ingredientPrices: {},
    ingredientTypes: [],
    totalPrice: 0,
    basicPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: true,
    success: false
  },
  orders: {
    orders: [],
    loading: true
  }
};

const actions = {
  ...burgerBuilderActions,
  ...ordersActions
}

const reducer = (state = initialState, action) => {
  console.log('ACTION DISPATCHED: ', action);
  if (actions[action.type]) {
    return actions[action.type](state, action);
  }
  return state;
};

export default reducer;
