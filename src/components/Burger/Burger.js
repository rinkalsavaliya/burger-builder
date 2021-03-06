import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => <BurgerIngredient key={igKey + i} type={igKey}/>)
  }).filter((array) => array.length);
  if (!transformedIngredients.length) {
    transformedIngredients = <p>Please start adding ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top'/>
        {transformedIngredients}
      <BurgerIngredient type='bread-bottom'/>
    </div>
  );
}

export default withRouter(burger);
