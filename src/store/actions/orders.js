const mapDispatchToProps = (dispatch) => {
  return {
    onGetOrders: (payload) => dispatch({ type: 'FETCH_ORDERS', payload }),
    onGetOrderFail: () => dispatch({ type: 'FAIL_FETCH_ORDERS' }),
  }
}

export default mapDispatchToProps;
