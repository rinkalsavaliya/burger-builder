import React from 'react';
import { Button, Loader, Input } from '../../../components';
import classes from './ContactData.module.css';
import axiosBurger from '../../../axios-orders';
import { withRouter } from 'react-router-dom';
import formInputs from './form-config';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../../store/actions/orders';

class ContactData extends React.Component {
  state = {
    formInputs: formInputs,
    ordering: false
  }
  isErrorInInput(value, validation, label) {
    if (validation.required && !value) {
      return `${label} is a required field`;
    }
    if (validation.minLength && value.toString().trim().length < validation.minLength) {
      return `${label} must have minimum length of ${validation.minLength}`;
    }
    if (validation.maxLength && value.toString().trim().length > validation.maxLength) {
      return `${label} must have maximum length of ${validation.maxLength}`;
    }
    return '';
  }
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ ...this.state, ordering: true });
    let state = {...this.state};
    let error = false
    for (const input in state.formInputs) {
      const errorMsg = this.isErrorInInput(state.formInputs[input].elementConfig.value, state.formInputs[input].validation, state.formInputs[input].label);
      if (errorMsg) {
        state.formInputs[input].error = errorMsg;
        error = true;
      }
    }
    if (error) {
      this.setState(state);
      return;
    }
    const customer = {
      name: this.state.formInputs.name.elementConfig.value,
      email: this.state.formInputs.email.elementConfig.value,
      address: {
        city: this.state.formInputs.city.elementConfig.value,
        country: this.state.formInputs.country.elementConfig.value,
        landmark: this.state.formInputs.landmark.elementConfig.value,
        street: this.state.formInputs.street.elementConfig.value,
        zipCode: this.state.formInputs.zipCode.elementConfig.value
      }
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer,
      deliveryMethod: 'fastest'
    }
    axiosBurger.post('/orders.json', order)
    .then((response) => {
      if (response.data) {
        order.id = response.data.name;
        this.props.onPlaceOrder(order);
        this.setState({ ...this.state, ordering: false }, () => {
          this.props.history.push('/');
        });
      } else {
        this.setState({ ...this.state, ordering: false });
      }
    }).catch((error) => {
      this.setState({ ...this.state, ordering: false });
    });
  }
  changeFormInput = (event, input) => {
    const formInputs = {...this.state.formInputs};
    if (formInputs[input]) {
      formInputs[input].elementConfig.value = event.target.value;
      formInputs[input].error = this.isErrorInInput(formInputs[input].elementConfig.value, formInputs[input].validation, formInputs[input].label);
      this.setState({ ...this.state, formInputs })
    }
  }
  render () {
    if (this.state.ordering) {
      return (
        <div className={classes.ContactData}>
          <Loader/>
        </div>
      )
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form onSubmit={this.orderHandler}>
          {
            Object.keys(this.state.formInputs).map(input => {
              return <Input
                        key={input}
                        change={(event) => this.changeFormInput(event, input)}
                        inputType={this.state.formInputs[input].inputType}
                        error={this.state.formInputs[input].error}
                        inputProps={this.state.formInputs[input].elementConfig}
                      />;
            })
          }
          <Button btnType='Success'>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default connect(null, mapDispatchToProps)(withRouter(ContactData));
