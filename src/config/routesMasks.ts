export const routesMasks = {
  main: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: 'product/:id',
    create: (id: number) => `/product/${id}`,
  },
  cart: {
    mask: 'cart',
    create: () => `/cart`,
  },
  auth: {
    mask: 'auth',
    create: () => `/auth`,
  },
};
