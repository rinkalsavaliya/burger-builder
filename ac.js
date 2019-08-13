import { bindActionCreator } from 'redux';

const loginActionCreator = (payload) => {

  return { type: whatever, payload: login() };
}

const mapDispatchToProps = (dispatch) => bindActionCreator({
  login: loginActionCreator,
  login: loginActionCreator
}, dispatch);
