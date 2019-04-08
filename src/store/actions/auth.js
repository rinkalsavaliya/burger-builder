import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { apiKey } from '../../axios-orders';
import { getExpirationTime } from '../../lib/helper';

const login = (payload, method) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.AUTH_INIT });
    payload.returnSecureToken = true;
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    if (method === 'login') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }
    axios.post(url, payload)
    .then(response => {
      dispatch({ type: actionTypes.AUTH_SUCCESS, payload: response.data })
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(err => {
      console.log(err);
      try {
        const error = err.response.data.error.message || '';
        dispatch({ type: actionTypes.AUTH_FAIL, payload: { error } });
      } catch (e) {
        console.log(e);
        dispatch({ type: actionTypes.AUTH_FAIL, payload: { error: 'something went wrong' } });
      }
    });
  };
}

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

const checkAuthTimeout = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, parseInt(expirationTime) * 1000);
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (payload, method) => dispatch(login(payload, method)),
    onResetAuth: (payload, method) => dispatch({ type: actionTypes.RESET_AUTH }),
    onLogout: () => dispatch({ type: actionTypes.AUTH_LOGOUT }),
    onCheckAuthTimeout: () => dispatch(checkAuthTimeout(getExpirationTime()))
  };
}

export default mapDispatchToProps;
