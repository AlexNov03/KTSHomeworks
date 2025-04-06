const baseUrl = 'https://api.escuelajs.co/api/v1';

export const ApiConfig = {
  products: {
    mask: `${baseUrl}/products`,
    create: function () {
      return this.mask;
    },
  },
  product: {
    mask: `${baseUrl}/products`,
    create: function (id: number) {
      return `${this.mask}/${id}`;
    },
  },
  categories: {
    mask: `${baseUrl}/categories`,
    create: function () {
      return this.mask;
    },
  },
};
