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
export default reducer;
