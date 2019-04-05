import React from 'react';
import classes from './Order.module.css';
const order = (props) => {
  const ingredients = Object.keys(props.order.ingredients).map(igKey => {
    return (!!props.order.ingredients[igKey] && <span
            key={`${props.order.id}-${igKey}`}
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
            }}
            >
            {igKey} ({props.order.ingredients[igKey]})
           </span>);
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredients}</p>
      <p>Price: <strong>USD {props.order.price.toFixed(2)}</strong></p>
    </div>
  );
}
export default order;
