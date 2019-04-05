import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputProps = {...props};
  delete inputProps.inputType;
  let inputElement = null;
  switch (props.inputType) {
    case 'textarea':
      inputElement = <textarea className={classes.Input} {...inputProps}/>
      break;
    default:
      inputElement = <input className={classes.Input} {...inputProps}/>
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
