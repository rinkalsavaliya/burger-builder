import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { apiKey } from '../../axios-orders';

const login = (payload, method) => {
  return (dispatch) => {
    console.log(method);
    dispatch({ type: actionTypes.AUTH_INIT });
    payload.returnSecureToken = true;
    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${apiKey}`;
    if (method === 'login') {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${apiKey}`;
    }
    axios.post(url, payload)
    .then(data => {
      dispatch({ type: actionTypes.AUTH_SUCCESS, payload: data.data })
    })
    .catch(err => {
      try {
        const error = err.response.data.error.message || '';
        dispatch({ type: actionTypes.AUTH_FAIL, payload: { error } });
      } catch (e) {
        dispatch({ type: actionTypes.AUTH_FAIL, payload: { error: 'something went wrong' } });
      }
    });
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (payload, method) => dispatch(login(payload, method)),
    onResetAuth: (payload, method) => dispatch({ type: actionTypes.RESET_AUTH })
  };
}

export default mapDispatchToProps;
