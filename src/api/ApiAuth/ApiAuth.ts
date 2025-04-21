import { Ajax, AjaxResponse, HTTPMethod } from 'api/Ajax/Ajax';
import { ApiConfig } from 'api/ApiConfig/ApiConfig';
import { FileDataApi } from 'models/File/FileData';
import { LoginDataApi } from 'models/Login/LoginData';
import { RegisterDataApi } from 'models/Register/RegisterData';

export type FileUploadParams = {
  file: File;
  metadata?: Record<string, string>;
};

export type RegisterParams = {
  name: string;
  email: string;
  password: string;
  avatar: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type TokenParams = {
  token: string;
};

class ApiAuth {
  async uploadFile(params: FileUploadParams): Promise<AjaxResponse<FileDataApi, unknown>> {
    const formData = new FormData();

    formData.append('file', params.file);

    if (params.metadata) {
      Object.entries(params.metadata).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }

    const response = await Ajax<FileDataApi, unknown, FormData>({
      url: ApiConfig.upload.create(),
      Method: HTTPMethod.POST,
      Headers: {
        'Content-Type': 'multipart/form-data',
      },
      Body: formData,
    });

    return response;
  }

  async register(params: RegisterParams): Promise<AjaxResponse<RegisterDataApi, unknown>> {
    const response = await Ajax<RegisterDataApi, unknown, string>({
      url: ApiConfig.register.create(),
      Method: HTTPMethod.POST,
      Headers: {
        'Content-Type': 'application/json',
      },
      Body: JSON.stringify(params),
    });

    return response;
  }

  async login(params: LoginParams): Promise<AjaxResponse<LoginDataApi, unknown>> {
    const response = await Ajax<LoginDataApi, unknown, string>({
      url: ApiConfig.login.create(),
      Method: HTTPMethod.POST,
      Headers: {
        'Content-Type': 'application/json',
      },
      Body: JSON.stringify(params),
    });

    return response;
  }

  async getUserData(params: TokenParams): Promise<AjaxResponse<RegisterDataApi, unknown>> {
    const response = await Ajax<RegisterDataApi, unknown, string>({
      url: ApiConfig.profile.create(),
      Method: HTTPMethod.GET,
      Headers: {
        Authorization: `Bearer ${params.token}`,
      },
    });

    return response;
  }
}

export default new ApiAuth();
