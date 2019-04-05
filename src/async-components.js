import { asyncComponent } from './hoc';
const AsyncBurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));

export {
  AsyncBurgerBuilder,
  AsyncCheckout,
  AsyncOrders
};
