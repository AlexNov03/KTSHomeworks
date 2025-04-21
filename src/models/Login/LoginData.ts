export type LoginDataApi = {
  access_token: string;
  refresh_token: string;
};

export type LoginData = {
  access_token: string;
  refresh_token: string;
};

export const normalizeProductData = (from: LoginDataApi): LoginData => ({
  access_token: from.access_token,
  refresh_token: from.refresh_token,
});
