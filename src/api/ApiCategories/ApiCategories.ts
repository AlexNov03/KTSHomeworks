import { Ajax, AjaxResponse, HTTPMethod } from 'api/Ajax/Ajax';
import { ApiConfig } from 'api/ApiConfig/ApiConfig';
import { CategoriesDataApi } from 'models/Categories/CategoriesData';

class ApiCategories {
  async getCategoriesList(): Promise<AjaxResponse<CategoriesDataApi[], unknown>> {
    const response = await Ajax<CategoriesDataApi[]>({ url: ApiConfig.categories.create(), Method: HTTPMethod.GET });
    return response;
  }
}

export default new ApiCategories();
