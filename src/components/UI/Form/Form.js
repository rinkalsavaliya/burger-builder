import React from 'react';
import Input from '../Input/Input';
import Button from '../Button/Button';
import './Form.css';
import { isErrorInInput } from '../../../lib/helper';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props};
  }
  changeFormInput = (event, input) => {
    const controls = {...this.state.controls};
    if (controls[input]) {
      controls[input].elementConfig.value = event.target.value;
      controls[input].error = isErrorInInput(controls[input].elementConfig.value, controls[input].validation, controls[input].label);
      this.setState({ ...this.state, controls })
    }
  }

  render() {
    return (
      <div className='Form'>
        <h4>{this.props.heading}</h4>
        <form onSubmit={(event) => this.props.submitForm(event, this.state.controls)}>
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
          <Button btnType='Success'>{this.props.submitText || 'SUBMIT'}</Button>
        </form>
      </div>
    );
  }
}

export default Form;
