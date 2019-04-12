import React from 'react';
// import { asyncComponent } from './hoc';
// const AsyncBurgerBuilder = React.lazy(() => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       console.log('importing');
//       resolve(import('./containers/BurgerBuilder/BurgerBuilder'))
//     }, 5000);
//   })
// });
const AsyncBurgerBuilder = React.lazy(() => import('./containers/BurgerBuilder/BurgerBuilder'));
const AsyncCheckout = React.lazy(() => import('./containers/Checkout/Checkout'));
const AsyncOrders = React.lazy(() => import('./containers/Orders/Orders'));
const AsyncAuth = React.lazy(() => import('./containers/Auth/Auth'));

export {
  AsyncBurgerBuilder,
  AsyncCheckout,
  AsyncOrders,
  AsyncAuth
};
