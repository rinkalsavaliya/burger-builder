import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import Loader from '../Loader/Loader';
import './Form.css';
import { isErrorInInput } from '../../../lib/helper';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  componentWillReceiveProps = (props) => {
    this.setState(props);
  }
  changeFormInput = (event, input) => {
    const controls = {...this.state.controls};
    if (controls[input]) {
      controls[input].elementConfig.value = event.target.value;
      controls[input].error = isErrorInInput(controls[input].elementConfig.value, controls[input].validation, controls[input].label);
      this.setState({ ...this.state, controls })
    }
  }

  submitForm = (event) => {
    event.preventDefault();
    const controls = {...this.state.controls};
    let error = false;
    for (const input in controls) {
      const errorMsg = isErrorInInput(controls[input].elementConfig.value, controls[input].validation, controls[input].label);
      if (errorMsg) {
        controls[input].error = errorMsg;
        error = true;
      }
    }
    if (error) {
      this.setState({...this.state,controls});
    } else {
      this.props.submitForm({ controls });
    }
  }

  render() {
    return (
      <div className='Form'>
        { !!this.props.heading && (<h4>{this.props.heading}</h4>)}
        <form onSubmit={this.submitForm}>
          {
            Object.keys(this.state.controls).map(input => {
              return <Input
                        key={input}
                        change={(event) => this.changeFormInput(event, input)}
                        inputType={this.state.controls[input].inputType}
                        error={this.state.controls[input].error}
                        inputProps={this.state.controls[input].elementConfig}
                      />;
            })
          }
          {this.props.error && (<p className='error'>{this.props.error}</p>)}
          {this.props.loading && (<Loader/>)}
          <Button btnType='Success'>{this.props.submitText || 'SUBMIT'}</Button>
        </form>
      </div>
    );
  }
}

export default Form;
