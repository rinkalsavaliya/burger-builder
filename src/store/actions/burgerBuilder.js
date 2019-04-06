const mapDispatchToProps = (dispatch) => {
  return {
    onGetIngredients: (payload) => dispatch({ type: 'FETCH_INGREDIENTS', payload }),
    onFailGetIngredients: () => dispatch({ type: 'FAIL_FETCH_INGREDIENTS' }),
    onAddIngredient: (payload) => dispatch({ type: 'ADD_INGREDIENT', payload }),
    onRemoveIngredient: (payload) => dispatch({ type: 'REMOVE_INGREDIENT', payload }),
    onPurchaseClick: (payload) => dispatch({ type: 'PURCHASE', payload })
  }
}

export default mapDispatchToProps;
