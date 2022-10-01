import { mergeQueryParamsString } from './merge-query-params-string';

export const joinUrl = (...args: string[]) => {
  const params: string[] = [];
  const argsParts = args.map((arg) => arg.split('/'));
  const parts = argsParts.flat();
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const [key, queryParams] = part.split('?');
    if (queryParams !== undefined) {
      params.push(queryParams);
    }
    parts[i] = key;
  }
  const urlString = parts.filter(Boolean).join('/');
  const queryParams = mergeQueryParamsString(params);
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join('&');
  return `${urlString}${queryString ? `?${queryString}` : ''}`;
};
