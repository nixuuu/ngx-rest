export const JoinBaseUrl = (url: string, baseUrl: string) => {
  return new URL(url, baseUrl).toString();
};
