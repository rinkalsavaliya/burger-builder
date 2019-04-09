import React from 'react';
import { Loader, Form } from '../../../components';
import classes from './ContactData.module.css';
import { withRouter, Redirect } from 'react-router-dom';
import controls from './form-config';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../store/actions/orders';
import { cloneDeep } from 'lodash';
const mapStateToProps = (state) => {
  return {
    ...state.order
  }
}

class ContactData extends React.Component {
  state = {
    controls: cloneDeep(controls),
    ordering: false
  };
  static getDerivedStateFromProps(props, state) {
    return {...controls, ordering: props.ordering};
  }

  orderHandler = (state) => {
    state = {...this.state,state};
    this.setState({ ...this.state, ordering: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: this.state.controls.name.elementConfig.value,
        email: this.state.controls.email.elementConfig.value,
        address: {
          city: this.state.controls.city.elementConfig.value,
          country: this.state.controls.country.elementConfig.value,
          landmark: this.state.controls.landmark.elementConfig.value,
          street: this.state.controls.street.elementConfig.value,
          zipCode: this.state.controls.zipCode.elementConfig.value
        }
      },
      deliveryMethod: this.state.controls.deliveryMethod.elementConfig.value
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
