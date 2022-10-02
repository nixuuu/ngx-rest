import { HttpContext } from '@angular/common/http';
import { OperatorFunction } from 'rxjs';
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
  pipes?: OperatorFunction<any, any>[];
}

export type ApiClientParams = string | ApiClientParamsOptions;
export const ApiClient = (params: ApiClientParams) => {
  return <T>(constructor: T): T => {
    Reflect.defineMetadata(NGX_API_CLIENT_OPTIONS, params, constructor);
    return constructor;
  };
};
