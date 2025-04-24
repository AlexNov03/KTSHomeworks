import { RouteObject } from 'react-router';
import Auth from 'pages/Auth';
// import Auth from 'pages/Auth';
import Cart from 'pages/Cart';
import Product from 'pages/Product';
import Products from 'pages/Products';
import Profile from 'pages/Profile';
import App from '../App';

import { routesMasks } from './routesMasks';

export const routesConfig: RouteObject[] = [
  {
    path: routesMasks.main.mask,
    element: <App />,
    children: [
      {
        path: routesMasks.main.mask,
        element: <Products />,
      },
      {
        path: routesMasks.product.mask,
        element: <Product />,
      },
      {
        path: routesMasks.cart.mask,
        element: <Cart />,
      },
      {
        path: routesMasks.auth.mask,
        element: <Auth />,
      },
      {
        path: routesMasks.profile.mask,
        element: <Profile />,
      },
    ],
  },
];
