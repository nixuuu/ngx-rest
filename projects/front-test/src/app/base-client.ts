import { ApiClient, NgxApiToken, NgxAuthenticatedToken } from 'ngx-rest';

@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  httpContext: [
    [NgxApiToken, true],
    [NgxAuthenticatedToken, true]
  ]
})
export class BaseClient {}
