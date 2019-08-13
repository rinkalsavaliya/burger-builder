import * as actionTypes from '../actionTypes';
import axiosBurger from '../../axios';
import { getTokenEncodedUrl, getUserId } from '../../lib/helper';

const placeOrder = (payload) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.PLACE_ORDER_INIT, payload })
    payload.userId = getUserId();
    axiosBurger.post(getTokenEncodedUrl(`/orders.json`), payload)
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


/**
 * sample response :
 *  {
 *  	"-Lbm5G1cFeNu0ZJ-mpzk": {
 *  		"customer": {
 *  			"address": {
 *  				"city": "sa", "country": "sa", "landmark": "sa", "street": "sa", "zipCode": "sssss"
 *  			},
 *  			"email": "sa",
 *  			"name": "sa"
 *  		},
 *  		"deliveryMethod": "fastest",
 *  		"ingredients": {
 *  			"bacon": 0, "cheese": 0, "meat": 1, "onion": 0, "salad": 0, "tomato": 0
 *  		},
 *  		"price": 5.3
 *  	},
 *  	"-Lbm5LeQAfQvCMMoQj4J": {
 *  		"customer": {
 *  			"address": {
 *  				"city": "s", "country": "s", "landmark": "s", "street": "s", "zipCode": "sssss"
 *  			},
 *  			"email": "s",
 *  			"name": "s"
 *  		},
 *  		"deliveryMethod": "fastest",
 *  		"ingredients": {
 *  			"bacon": 0, "cheese": 0, "meat": 0, "onion": 1, "salad": 0, "tomato": 0
 *  		},
 *  		"price": 4.2
 *  	}
 *  }
 */
const fetchOrders = () => {
  return (dispatch) => {
    dispatch({ type: actionTypes.FETCH_ORDERS_INIT })
    axiosBurger.get(`${getTokenEncodedUrl('/orders.json')}&orderBy="userId"&equalTo="${getUserId()}"`)
      .then((response) => {
        if (response && response.data) {
          dispatch({
            type: actionTypes.FETCH_ORDERS_SUCCESS,
            payload: {
              orders: Object.keys(response.data).map(orderId => { return { ...response.data[orderId], id: orderId } })
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
