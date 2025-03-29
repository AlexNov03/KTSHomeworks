import React from 'react';
import { RouteObject } from 'react-router';
import Product from 'pages/Product';
import Products from 'pages/Products';
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
    ],
  },
];
