export const routesMasks = {
  main: {
    mask: '/',
    create: () => '/',
  },
  product: {
    mask: '/product/:id',
    create: (id: number) => `/product/${id}`,
  },
};
