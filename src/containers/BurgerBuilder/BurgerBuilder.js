import React from 'react';
import { Aux } from '../../hoc';
import { Burger, BuildControls, Modal, OrderSummary, Loader } from '../../components';
import axiosBurger from '../../axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import mapDispatchToProps from '../../store/actions/burgerBuilder';

const mapStateToProps = state => {
  return { ...state.burgerBuilder, isAuthenticated: state.auth.authData.auth };
};

class BurgerBuilder extends React.Component {
  state = { purchasing: false };
  purchaseHandler = (value) => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: value.purchasing });
    } else {
      this.props.history.push({ pathname: '/auth' });
    }
  }
  purchaseContinueHandler = () => {
    this.props.history.push({ pathname: '/checkout' });
  }
  componentDidMount = async () => {
    if (Object.keys(this.props.ingredients).length === 0) {
      this.props.onFetchIngredients();
    }
  }


  render() {
    const disableInfo = { ...this.props.ingredients };
    return (
      this.props.loading ? <Loader /> :
        !this.props.success ?
          <p style={{ textAlign: 'center' }}>Ingredients can't be loaded</p> :
          <Aux>
            <div className='burger-wrapper'>
              <Burger ingredients={this.props.ingredients} />
              <BuildControls
                ingredientTypes={this.props.ingredientTypes}
                purchase={() => this.purchaseHandler({ purchasing: true })}
                purchasable={!this.props.purchasable}
                price={this.props.totalPrice}
                disable={disableInfo}
                addIngredient={this.props.onAddIngredient}
                removeIngredient={this.props.onRemoveIngredient}
                isAuthenticated={this.props.isAuthenticated}
              />
            </div>
            <Modal
              show={this.state.purchasing}
              closeModal={() => this.purchaseHandler({ purchasing: false })}>
              <OrderSummary
                ingredients={this.props.ingredients}
                closeModal={() => this.purchaseHandler({ purchasing: false })}
                continuePurchase={this.purchaseContinueHandler}
                totalPrice={this.props.totalPrice}>
              </OrderSummary>
            </Modal>
          </Aux>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BurgerBuilder, axiosBurger));
