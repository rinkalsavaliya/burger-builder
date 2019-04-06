import React from 'react';
import { Order, Loader } from '../../components';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../store/actions/orders';
const mapStateToProps = state => {
  return {...state.orders};
};

class Orders extends React.Component {
  componentDidMount = () => {
    if (!this.props.orders.length) {
      this.fetchOrders();
    }
  }
  fetchOrders = () => {
    axios.get('/orders.json')
    .then((response) => {
      this.props.onFetchOrders();
    }).catch(() => {
      this.props.onFetchOrderFail();
    })
  }
  render() {
    if (this.props.loading) {
      return <Loader/>
    }
    if (!this.props.orders.length) {
      return <p style={{textAlign: 'center'}}>No data available</p>;
    }
    return (
      <div>
        {
          this.props.orders.map(order => <Order key={order.id} order={order}/>)
        }
      </div>
    );
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
