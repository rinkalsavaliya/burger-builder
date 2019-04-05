import React from 'react';
import { Order, Loader } from '../../components';
import axios from '../../axios-orders';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount = () => {
    this.fetchOrders();
  }
  fetchOrders = () => {
    axios.get('/orders.json')
    .then((response) => {
      if (response.data) {
        const state = {
          orders: Object.keys(response.data).map(orderId => { return {...response.data[orderId], id: orderId} }),
          loading: false
        };
        this.setState(state);
      } else {
        this.setState({ ...this.state, loading: false });
      }
    }).catch(() => {
      this.setState({ ...this.state, loading: false });
    })
  }
  render() {
    if (this.state.loading) {
      return <Loader/>
    }
    if (!this.state.orders.length) {
      return <p style={{textAlign: 'center'}}>No data available</p>;
    }
    return (
      <div>
        {
          this.state.orders.map(order => <Order key={order.id} order={order}/>)
        }
      </div>
    );
  }
};
export default Orders;
