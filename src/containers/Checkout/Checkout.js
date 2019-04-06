import React from 'react';
import { CheckoutSummary } from '../../components';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
const mapStateToProps = state => {
  return {
    ingredients: {...state.burgerBuilder.ingredients},
    price: state.burgerBuilder.totalPrice
  }
};

class Checkout extends React.Component {
  state = {...this.props};
  componentWillMount = () => {
    if (Object.keys(this.props.ingredients).length === 0) {
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
        <CheckoutSummary price={this.state.price} ingredients={this.state.ingredients} checkoutCancelled={this.checkoutCancelled} checkoutContinued={this.checkoutContinued}/>
        <Route path={`${this.props.match.url}/contact-data`} render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.price}/>)}/>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Checkout);
