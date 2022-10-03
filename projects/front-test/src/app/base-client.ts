import { ApiClient } from 'ngx-rest';

@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com'
})
export class BaseClient {}
