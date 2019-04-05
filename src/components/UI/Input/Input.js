import React from 'react';
import classes from './Input.module.css';

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if (props.error) {
    inputClasses.push(classes.InputElementError);
  }
  switch (props.inputType) {
    case 'textarea':
      inputElement = <textarea onChange={props.change} className={inputClasses.join(' ')} {...props.inputProps}/>
      break;
    case 'select':
      inputElement = (
        <select className={inputClasses.join(' ')} value={props.inputProps.value} onChange={props.change}>
          {
            props.inputProps.options.map(option => <option key={option.value} value={option.value}>{option.displayValue}</option>)
          }
        </select>
      )
      break;
    default:
      inputElement = <input onChange={props.change} className={inputClasses.join(' ')} {...props.inputProps}/>
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {/*{!!props.error && <p className={classes.Error}>{props.error}</p>}*/}
    </div>
  );
};
export default input;
