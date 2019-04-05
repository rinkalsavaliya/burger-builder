import React from 'react';
import { Button, Loader } from '../../../components';
import classes from './ContactData.module.css';
import axiosBurger from '../../../axios-orders';
import { withRouter } from 'react-router-dom';

class ContactData extends React.Component {
  state = {
    user: {
      name: '',
      address: {
        street: '', landmark: '', city: '', country: '', zipCode: '',
      },
      email: ''
    },
    ordering: false
  }
  orderHandler = (event) => {
    event.preventDefault();
    console.log(this.props);
    this.setState({ ...this.state, ordering: true });
    setTimeout(() => {
      const order = {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: 'Rinkal',
          address: {
            street: 'C-103, Shrifal Apartment, Opp. Osia Hypermart',
            landmark: 'Gota',
            city: 'Ahmedabad',
            country: 'India',
            zipCode: '382481'
          },
          email: 'rinkal@scaletech.xyz'
        },
        deliveryMethod: 'fastest'
      }
      axiosBurger.post('/orders.json', order)
      .then((response) => {
        if (response.data) {
          this.setState({ ...this.state, ordering: false }, () => {
            this.props.history.push('/');
          });
        } else {
          this.setState({ ...this.state, ordering: false });
        }
      }).catch((error) => {
        this.setState({ ...this.state, ordering: false });
      });
    }, 2000);
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
        <form>
          <input className={classes.Input} type='text' name='name' placeholder='please enter your name'/>
          <input className={classes.Input} type='email' name='email' placeholder='please enter your email'/>
          <input className={classes.Input} type='text' name='street' placeholder='please enter street'/>
          <input className={classes.Input} type='text' name='landmark' placeholder='please enter landmark'/>
          <input className={classes.Input} type='text' name='city' placeholder='please enter city'/>
          <input className={classes.Input} type='text' name='country' placeholder='please enter country'/>
          <input className={classes.Input} type='text' name='zipCode' placeholder='please enter zip-code'/>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      </div>
    )
  }
}

export default withRouter(ContactData);
