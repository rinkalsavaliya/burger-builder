import * as actionTypes from '../action-types';

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (payload) => dispatch({ type: actionTypes.FETCH_ORDERS, payload }),
    onFetchOrderFail: () => dispatch({ type: actionTypes.FAIL_FETCH_ORDERS }),
  }
}

export default mapDispatchToProps;
