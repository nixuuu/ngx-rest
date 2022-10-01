export const mapUrlParameters = (url: string, parameters: any) => {
  if (!parameters) {
    return url;
  }
  if (typeof parameters !== 'object') {
    return url;
  }

  Object.entries<any>(parameters).forEach(([key, value]) => {
    if (typeof value === 'object') {
      try {
        value = JSON.stringify(value);
      } catch (e) {
        value = value?.toString();
      }
    } else {
      value = value?.toString();
    }
    url = url.replace(new RegExp(`:${key}`, 'g'), value);
  });

  return url;
};
