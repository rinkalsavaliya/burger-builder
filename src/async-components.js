import { asyncComponent } from './hoc';
const AsyncBurgerBuilder = asyncComponent(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = asyncComponent(() => import('./containers/Orders/Orders'));
const AsyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

export {
  AsyncBurgerBuilder,
  AsyncCheckout,
  AsyncOrders,
  AsyncAuth
};
