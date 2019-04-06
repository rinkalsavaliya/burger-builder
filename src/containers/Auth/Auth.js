import React from 'react';
import { Form } from '../../components';
import './Auth.css';
import { isErrorInInput } from '../../lib/helper';
import { controls } from './auth-controls';

class Auth extends React.Component {
  state = {
    controls
  };
  changeFormInput = (event, input) => {
    const controls = {...this.state.controls};
    if (controls[input]) {
      controls[input].elementConfig.value = event.target.value;
      controls[input].error = isErrorInInput(controls[input].elementConfig.value, controls[input].validation, controls[input].label);
      this.setState({ ...this.state, controls })
    }
  }

  login = (event) => {
    event.preventDefault();
    console.log(this.state.controls);
  }
  render() {
    return (
      <Form controls={controls} submitForm={this.login} heading='LOGIN'/>
    );
  }
}

export default Auth;
