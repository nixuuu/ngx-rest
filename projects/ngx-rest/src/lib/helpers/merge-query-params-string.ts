import { AnyObject } from '../types/any-object';

export const mergeQueryParamsString = (params: string[]) => {
  const queryParams: AnyObject = {};
  for (const param of params) {
    const [key, value] = param.split('=');
    if (key.length === 0) {
      continue;
    }
    queryParams[key] = value;
  }
  return queryParams;
};
