import { ApiClient, NgxApiToken, NgxAuthenticatedToken } from 'ngx-rest';

@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  httpContext: [
    [NgxApiToken, true],
    [NgxAuthenticatedToken, true]
  ],
  headers: {
    'x-test': '1'
  }
})
export class BaseClient {}
