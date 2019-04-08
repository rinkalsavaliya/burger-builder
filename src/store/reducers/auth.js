import * as actionTypes from '../actionTypes';

const reducer = {};

reducer[actionTypes.AUTH_INIT] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: true
    }
  };
}

reducer[actionTypes.AUTH_SUCCESS] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      authData: action.payload.authData,
      error: ''
    }
  };
}

reducer[actionTypes.AUTH_FAIL] = (state, action) => {
  return {
    ...state,
    auth: {
      ...state.auth,
      loading: false,
      error: action.payload.error
    }
  };
}

reducer[actionTypes.RESET_AUTH] = (state, action) => {
  return {
    ...state,
    auth: {
      loading: false,
      error: '',
      authData: {}
    }
  }
}
export default reducer;
