import * as actionTypes from '../actionTypes';
import axiosBurger from '../../axios-orders';
import { mapIngredients } from '../../lib/mapper';

const setIngredients = (payload) => {
  return { type: actionTypes.FETCH_INGREDIENTS, payload };
}

const fetchIngredients = (payload) => {
  return (dispatch) => {
    axiosBurger('/ingredients.json')
    .then((ingredientsData) => {
      /*
      * sample response :
      *  {
      *   "data": {
      *     "basicPrice": 4,
      *  		"ingredients": [
      *       { "label": "Onion", "price": 0.2, "type": "onion" }, { "label": "Salad", "price": 0.5, "type": "salad" },
      *       { "label": "Tomato", "price": 0.8, "type": "tomato" }, { "label": "Cheese", "price": 0.4, "type": "cheese" },
      *       { "label": "Bacon", "price": 0.7, "type": "bacon" }, { "label": "Meat", "price": 1.3, "type": "meat" }
      *     ]
      *    }
      *  }
      */
      if (ingredientsData && ingredientsData.data && ingredientsData.data.data) {
        dispatch(setIngredients(mapIngredients(ingredientsData.data.data)));
      } else {
        dispatch({ type: actionTypes.FAIL_FETCH_INGREDIENTS });
      }
    }).catch(err => {
      dispatch({ type: actionTypes.FAIL_FETCH_INGREDIENTS });
    });
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchIngredients: (payload) => dispatch(fetchIngredients(payload)),
    onFailGetIngredients: () => dispatch({ type: actionTypes.FAIL_FETCH_INGREDIENTS }),
    onAddIngredient: (payload) => dispatch({ type: actionTypes.ADD_INGREDIENT, payload }),
    onRemoveIngredient: (payload) => dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload })
  };
}

export default mapDispatchToProps;
