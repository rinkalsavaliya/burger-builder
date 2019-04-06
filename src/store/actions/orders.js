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

const fetchOrders = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ORDERS_INIT })
    axiosBurger.get('/orders.json')
    .then((response) => {
      if (response && response.data) {
        dispatch({
          type: actionTypes.FETCH_ORDERS_SUCCESS,
          payload: {
            orders: Object.keys(response.data).map(orderId => { return {...response.data[orderId], id: orderId} })
          }
        })
      } else {
        dispatch({ type: actionTypes.FETCH_ORDERS_FAIL })
      }
    }).catch(err => {
      console.log(err, 'err');
      dispatch({ type: actionTypes.FETCH_ORDERS_FAIL });
    });
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (payload) => dispatch(fetchOrders()),
    onFetchOrderFail: () => dispatch({ type: actionTypes.FETCH_ORDERS_FAIL }),
    onPlaceOrder: (payload) => dispatch(placeOrder(payload)),
  }
}

export default mapDispatchToProps;
