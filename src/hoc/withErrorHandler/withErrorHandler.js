import React from 'react';
import { Modal, Button } from '../../components';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends React.Component {
    state = {
      error: null
    }

    componentWillMount = () => {
      this.reqInterceptor = axios.interceptors.request.use((request) => {
        this.setState({ error: null });
        return request;
      });
      this.resInterceptor = axios.interceptors.response.use(res => {
        return res;
      }, error => {
        console.log(error, ' error');
        this.setState({ error });
        return error;
      });
    }

    componentWillUnmount = () => {
      console.log('withErrorHandler componentWillUnmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    closeError = () => {
      this.setState({ error: null });
    }
    render() {
      return (
        <Aux>
          <Modal textAlign='center' show={this.state.error !== null} closeModal={this.closeError}>
            {!!this.state.error && this.state.error.message}
            <br/>
            <Button clicked={this.closeError} btnType='Danger'>CLOSE</Button>
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
};
export default withErrorHandler;
