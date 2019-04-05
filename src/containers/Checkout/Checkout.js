import React from 'react';
import { CheckoutSummary } from '../../components';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: {},
    price: 0
  };
  componentWillMount = () => {
    if (this.props.location.search && this.props.location.search.length > 1) {
      const state = {...this.state};
      const query = this.props.location.search.substring(1).split('&').map(val => val.split('='));
      state.ingredients = {};
      query.forEach(queryParam => {
        if (queryParam[0] !== 'price') {
          state.ingredients[queryParam[0]] = parseInt(queryParam[1]);
        } else {
          state.price = parseFloat(queryParam[1]);
        }
      });
      this.setState(state);
    } else {
      this.props.history.push('/');
    }
  }
  checkoutCancelled = () => {
    this.props.history.push('/');
  }
  checkoutContinued = () => {
    this.props.history.push('/checkout/contact-data');
  }
  render() {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued}/>
        <Route path={`${this.props.match.url}/contact-data`} render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price}/>)}/>
      </div>
    );
  }
}
export default Checkout;
