import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  switch (props.inputType) {
    case 'textarea':
      inputElement = <textarea onChange={props.change} className={classes.Input} {...props.inputProps}/>
      break;
    case 'select':
      inputElement = (
        <select className={classes.Input} value={props.inputProps.value} onChange={props.change}>
          {
            props.inputProps.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)
          }
        </select>
      )
      break;
    default:
      inputElement = <input onChange={props.change} className={classes.Input} {...props.inputProps}/>
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {!!props.error && <p className={classes.Error}>{props.error}</p>}
    </div>
  );
};
export default input;
