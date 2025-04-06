export type ProductDataApi = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
};

export type ProductData = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
};

export const normalizeProductData = (from: ProductDataApi): ProductData => ({
  id: from.id,
  title: from.title,
  slug: from.slug,
  price: from.price,
  description: from.description,
  images: from.images,
});
