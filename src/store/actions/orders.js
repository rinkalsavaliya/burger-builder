import * as actionTypes from '../actionTypes';
import axiosBurger from '../../axios-orders';

const placeOrder = (payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.PLACE_ORDER_INIT, payload })
    axiosBurger.post('/orders.json', payload)
    .then((response) => {
      if (response && response.data) {
        payload.id = response.data.name;
        dispatch({ type: actionTypes.PLACE_ORDER, payload })
      } else {
        dispatch({ type: actionTypes.PLACE_ORDER_FAIL })
      }
    }).catch(err => {
      console.log(err, 'err');
      dispatch({ type: actionTypes.PLACE_ORDER_FAIL });
    });
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (payload) => dispatch({ type: actionTypes.FETCH_ORDERS, payload }),
    onFetchOrderFail: () => dispatch({ type: actionTypes.FAIL_FETCH_ORDERS }),
    onPlaceOrder: (payload) => dispatch(placeOrder(payload)),
  }
}

export default mapDispatchToProps;
