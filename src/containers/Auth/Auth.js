import React from 'react';
import { Form } from '../../components';
import { Aux } from '../../hoc';
import classes from './Auth.module.css';
import { isErrorInInput } from '../../lib/helper';
import { controls } from './auth-controls';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import mapDispatchToProps from '../../store/actions/auth';

const mapStateToProps = (state) => {
  return {...state.auth, totalPrice: state.burgerBuilder.totalPrice, basicPrice: state.burgerBuilder.basicPrice };
}

class Auth extends React.Component {
  state = { controls: {...controls}, isSignUp: false, error: '' };

  static getDerivedStateFromProps = (props, state) => {
    return { ...state, error: props.error };
  }

  switchAuthMode = (value) => {
    if (this.state.isSignUp === value) {
      return;
    }
    this.setState({ controls: {...controls}, isSignUp: value });
    if (this.props.error) {
      this.props.onResetAuth();
    }
  }

  changeFormInput = (event, input) => {
    const controls = {...this.state.controls};
    if (controls[input]) {
      controls[input].elementConfig.value = event.target.value;
      controls[input].error = isErrorInInput(controls[input].elementConfig.value, controls[input].validation, controls[input].label);
      this.setState({ ...this.state, controls })
    }
  }

  login = (state) => {
    this.setState({ ...this.state, controls: state.controls });
    this.props.onLogin({
      email: state.controls.email.elementConfig.value,
      password: state.controls.password.elementConfig.value
    }, this.state.isSignUp ? 'signup' : 'login');
  }

  render() {
    if (this.props.authData && this.props.authData.auth) {
      return (<Redirect to='/'/>);
    }
    return (
      <Aux>
        <div className={classes.FormWrapper}>
          <div className={classes.FormWrapper2}>
            <div
              className={[classes.SignUpLoginDiv, this.state.isSignUp ? classes.NonActiveDiv : classes.ActiveDiv].join(' ')}
              onClick={() => this.switchAuthMode(false)}
            >Login</div>
            <div
              className={[classes.SignUpLoginDiv, this.state.isSignUp ? classes.ActiveDiv : classes.NonActiveDiv].join(' ')}
              onClick={() => this.switchAuthMode(true)}
            >Signup</div>
          </div>
          <Form
            loading={this.props.loading}
            error={this.state.error}
            controls={JSON.parse(JSON.stringify(this.state.controls))}
            submitForm={this.login}
            submitText={this.state.isSignUp ? 'SIGNUP' : 'LOGIN'}
            heading={this.state.isSignUp ? 'REGISTER' : 'LOGIN'}
          />
        </div>
      </Aux>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
