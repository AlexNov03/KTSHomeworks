import axios from 'axios';

export enum HTTPMethod {
  GET = 'get',
  POST = 'post',
}

export type AjaxParams = {
  Method: HTTPMethod;
  url: string;
};

export enum StatusHTTP {
  status200 = 200,
  status201 = 201,
  status300 = 300,
  status304 = 304,
  status400 = 400,
  status401 = 401,
  status403 = 403,
  status404 = 404,
  status422 = 422,
  UNEXPECTED_ERROR = 'UNEXPECTED ERROR',
}

export type AjaxResponse<T, ErrorT = unknown> =
  | {
      success: true;
      data: T;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: ErrorT;
      status: StatusHTTP;
    }
  | {
      success: false;
      data: null;
      status: StatusHTTP.UNEXPECTED_ERROR;
    };

export const Ajax = async <T, ErrorT = unknown>(params: AjaxParams): Promise<AjaxResponse<T, ErrorT>> => {
  const result = await axios({
    method: params.Method,
    url: params.url,
  });

  try {
    let success = true;
    if (result.status >= 400) {
      success = false;
    }
    return {
      success: success,
      data: result.data,
      status: result.status,
    };
  } catch {
    return {
      success: false,
      data: null,
      status: StatusHTTP.UNEXPECTED_ERROR,
    };
  }
};
