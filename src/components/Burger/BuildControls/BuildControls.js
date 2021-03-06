import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>Current Price: {props.price.toFixed(2)}</p>
      {
        props.ingredientTypes.map((control) => {
          return <BuildControl
                    key={control.label}
                    label={control.label}
                    disabled={props.disable[control.type] <= 0}
                    addIngredient={() => props.addIngredient({ ingredientType: control.type })}
                    removeIngredient={() => props.removeIngredient({ ingredientType: control.type })}
                  />
        })
      }
      <button onClick={props.purchase} disabled={props.purchasable} className={classes.OrderButton}>{props.isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
  )
};

export default buildControls;
