export type CategoriesDataApi = {
  id: number;
  name: string;
};

export type CategoriesData = {
  id: number;
  name: string;
};

export const normalizeCategoriesData = (from: CategoriesDataApi): CategoriesData => ({
  id: from.id,
  name: from.name,
});
