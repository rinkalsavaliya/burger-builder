import React from 'react';
import classes from './Modal.module.css';
import { Aux } from '../../../hoc';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends React.Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return (nextProps.show !== this.props.show || nextProps.children !== this.props.children);
  }
  render = () => (
    <Aux>
      <Backdrop show={this.props.show} clicked={this.props.closeModal}/>
      <div className={classes.Modal} style={{
         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
         opacity: this.props.show ? '1' : '0',
         textAlign: this.props.textAlign
      }}>
        {this.props.children}
      </div>
    </Aux>
  )
}
export default Modal;
