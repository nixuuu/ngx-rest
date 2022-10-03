import { ApiClientParams, ApiClientParamsOptions } from '../decorators';
import { joinUrl } from './join-url';

export const transformApiClientParams = (
  params: ApiClientParams
): ApiClientParamsOptions => {
  if (typeof params === 'string') {
    return { path: params };
  }
  return params;
};

export const joinApiClientParamsPaths = (
  options1: ApiClientParamsOptions,
  options2: ApiClientParamsOptions
): ApiClientParamsOptions => {
  const path1 = options1.path ?? '';
  const path2 = options2.path ?? '';
  const path = joinUrl(path1, path2);
  return { ...options1, ...options2, path };
};
