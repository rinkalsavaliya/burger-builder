import * as actionTypes from '../actionTypes';

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchIngredients: (payload) => dispatch({ type: actionTypes.FETCH_INGREDIENTS, payload }),
    onFailGetIngredients: () => dispatch({ type: actionTypes.FAIL_FETCH_INGREDIENTS }),
    onAddIngredient: (payload) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload }),
    onRemoveIngredient: (payload) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload })
  };
}

export default mapDispatchToProps;
