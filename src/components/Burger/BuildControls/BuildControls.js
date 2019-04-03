import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: {props.price.toFixed(2)}</p>
      {
        controls.map((control) => {
          return <BuildControl
                    key={control.label}
                    label={control.label}
                    disabled={props.disable[control.type] <= 0}
                    addIngredient={() => props.addIngredient(control.type)}
                    removeIngredient={() => props.removeIngredient(control.type)}
                  />
        })
      }
      <button onClick={props.purchase} disabled={props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
  )
};

export default buildControls;
