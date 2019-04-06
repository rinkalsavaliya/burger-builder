import * as actionTypes from '../actionTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (payload) => dispatch({ type: actionTypes.FETCH_ORDERS, payload }),
    onFetchOrderFail: () => dispatch({ type: actionTypes.FAIL_FETCH_ORDERS }),
    onPlaceOrder: (payload) => dispatch({ type: actionTypes.PLACE_ORDER, payload }),
  }
}

export default mapDispatchToProps;
