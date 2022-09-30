const NGX_BASE_URL = Symbol('NGX_BASE_URL');
const BaseUrl = (baseUrl: string) => {
  return Reflect.metadata(NGX_BASE_URL, baseUrl);
}

export { BaseUrl };
