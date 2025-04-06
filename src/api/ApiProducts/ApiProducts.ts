import { Ajax, AjaxResponse, HTTPMethod } from 'api/Ajax/Ajax';
import { ApiConfig } from 'api/ApiConfig/ApiConfig';
import { ProductData } from 'models/Products/ProductData';

export enum ProductsQueryParamsNames {
  CATEGORY_ID = 'categoryId',
  TITLE = 'title',
  OFFSET = 'offset',
  LIMIT = 'limit',
}

export type ProductsQueryParams = {
  title?: string;
  categoryId?: string;
  offset?: number;
  limit?: number;
};

class ApiProducts {
  async getProducts(queryParams: ProductsQueryParams = {}): Promise<AjaxResponse<ProductData[], unknown>> {
    let url = ApiConfig.products.create();

    let params = '';
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key as keyof ProductsQueryParams];
      if (value !== undefined) {
        params += `${key}=${value}&`;
      }
    });

    url += params ? '?' + params : '';

    const response = await Ajax<ProductData[]>({ url: url, Method: HTTPMethod.GET });
    return response;
  }

  async getProductByID(id: number): Promise<AjaxResponse<ProductData, unknown>> {
    const response = await Ajax<ProductData>({ url: ApiConfig.product.create(id), Method: HTTPMethod.GET });
    return response;
  }
}

export default new ApiProducts();
