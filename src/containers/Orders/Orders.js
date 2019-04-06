import React from 'react';
import { Order, Loader } from '../../components';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../store/actions/orders';
const mapStateToProps = state => {
  return {...state.orders};
};

class Orders extends React.Component {
  state = {...this.props};
  static getDerivedStateFromProps = (props) => {
    return { ...props };
  }
  componentDidMount = () => {
    this.fetchOrders();
  }
  fetchOrders = () => {
    axios.get('/orders.json')
    .then((response) => {
      if (response.data) {
        this.props.onGetOrders({ orders: Object.keys(response.data).map(orderId => { return {...response.data[orderId], id: orderId} }) });
      } else {
        this.props.onGetOrderFail();
      }
    }).catch(() => {
      this.props.onGetOrderFail();
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
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
