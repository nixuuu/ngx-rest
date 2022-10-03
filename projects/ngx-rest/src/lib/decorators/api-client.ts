import { HttpContext } from '@angular/common/http';
import {
  joinApiClientParamsPaths,
  transformApiClientParams
} from '../helpers/transform-api-client-params';
import { Constructor } from '../types/constructor.type';
import { Headers } from '../types/request/headers';

export const NGX_API_CLIENT_OPTIONS = Symbol('NGX_API_CLIENT_OPTIONS');
export type QueryParamValue =
  | string
  | number
  | boolean
  | ReadonlyArray<string | number | boolean>;

export interface ApiClientParamsOptions {
  baseUrl?: string;
  queryParams?: { [key: string]: QueryParamValue };
  httpContext?: HttpContext;
  headers?: Headers;
  path?: string;
}

export type ApiClientParams = string | ApiClientParamsOptions;
export const ApiClient = (params: ApiClientParams) => {
  return <T extends Constructor>(constructor: T): T => {
    const prototype = Object.getPrototypeOf(constructor);
    let prototypeOptions: ApiClientParams =
      Reflect.getMetadata(NGX_API_CLIENT_OPTIONS, prototype) ?? {};
    prototypeOptions = transformApiClientParams(prototypeOptions);
    params = transformApiClientParams(params);

    if (prototypeOptions?.baseUrl && params?.baseUrl) {
      throw new Error('Base url already defined');
    }

    params = joinApiClientParamsPaths(prototypeOptions, params);

    Reflect.defineMetadata(NGX_API_CLIENT_OPTIONS, params, constructor);
    return constructor;
  };
};
