import React from 'react';
import { Loader, Form } from '../../../components';
import classes from './ContactData.module.css';
import { withRouter, Redirect } from 'react-router-dom';
import controls from './form-config';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../store/actions/orders';
import { isErrorInInput } from '../../../lib/helper';
const mapStateToProps = (state) => {
  return {
    ...state.order
  }
}

class ContactData extends React.Component {
  state = {
    controls: {...controls},
    ordering: false
  };
  static getDerivedStateFromProps(props, state) {
    return {...controls, ordering: props.ordering};
  }

  orderHandler = (event, state) => {
    event.preventDefault();
    state = {...this.state,state};
    this.setState({ ...this.state, ordering: true });
    let error = false;
    for (const input in state.controls) {
      const errorMsg = isErrorInInput(state.controls[input].elementConfig.value, state.controls[input].validation, state.controls[input].label);
      console.log(input, errorMsg);
      if (errorMsg) {
        state.controls[input].error = errorMsg;
        error = true;
      }
    }
    if (error) {
      this.setState(state);
      return;
    }
    const customer = {
      name: this.state.controls.name.elementConfig.value,
      email: this.state.controls.email.elementConfig.value,
      address: {
        city: this.state.controls.city.elementConfig.value,
        country: this.state.controls.country.elementConfig.value,
        landmark: this.state.controls.landmark.elementConfig.value,
        street: this.state.controls.street.elementConfig.value,
        zipCode: this.state.controls.zipCode.elementConfig.value
      }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer,
      deliveryMethod: 'fastest'
    }
    this.props.onPlaceOrder(order);
  }
  render () {
    const ings = Object.keys(this.props.ingredients || {});
    if (!ings.length || ings.map((val) => this.props.ingredients[val]).reduce((val1, val2) => val1 + val2) === 0) {
      return <Redirect to='/'/>
    }
    if (this.state.ordering) {
      return (
        <div className={classes.ContactData}>
          <Loader/>
        </div>
      )
    }
    return (
      <Form controls={this.state.controls} submitForm={this.orderHandler} submitText='ORDER' heading='Enter your contact data'/>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));
