import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={'order-summary-li-' + igKey}>
      <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the follwoing ingredients</p>
      <ul>
        {ingredientSummary}
      </ul>
      <p>Total Price : <strong>{props.totalPrice.toFixed(2)}</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.closeModal}>CANCEL</Button>
      <Button btnType='Success' clicked={props.continuePurchase}>CONTINUE</Button>
    </Aux>
  )
};

export default orderSummary;
