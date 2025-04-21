export type RegisterDataApi = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
};

export type RegisterData = {
  email: string;
  password: string;
  name: string;
  avatar: string;
  role: string;
  id: number;
};

export const normalizeProductData = (from: RegisterDataApi): RegisterData => ({
  email: from.email,
  password: from.password,
  name: from.name,
  avatar: from.avatar,
  role: from.role,
  id: from.id,
});
