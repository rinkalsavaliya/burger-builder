import React from 'react';
import { CheckoutSummary } from '../../components';

class Checkout extends React.Component {
  render() {
    console.log(this.props, 'props');
    const ingredients = {
      onion: 1, salad: 1, tomato: 1, cheese: 1, bacon: 1, meat: 1
    };
    return (
      <div>
        <CheckoutSummary ingredients={ingredients}/>
      </div>
    );
  }
}
export default Checkout;
