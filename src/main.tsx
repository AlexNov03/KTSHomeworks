// @ts-expect-error - React is needed for JSX
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router';
import { routesConfig } from './config/routes.tsx';
import './config/configureMobX.ts';
import './index.scss';
import './variables.scss';
import 'regenerator-runtime';

// const router = createBrowserRouter(routesConfig);

// createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);

const router = createBrowserRouter(routesConfig);
const root = createRoot(document.getElementById('root')!);

root.render(<RouterProvider router={router} />);

if (process.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept();
}
