import { Injectable } from '@angular/core';
import { ApiClient, Get, NgxRestService, TextRequest } from 'ngx-rest';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  queryParams: {
    apiKey: environment.apiKey
  }
})
export class AuthService {
  constructor(protected http: NgxRestService) {}

  @Get('posts/:id')
  login(id: any) {
    return new TextRequest({
      queryParams: {
        page: 2
      },
      params: { id }
    });
  }
}
