import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, Get, JsonRequest } from 'ngx-rest';
import { Observable } from 'rxjs';
import { SecondModuleModule } from './second-module.module';

@Injectable({
  providedIn: SecondModuleModule
})
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com',
  path: 'photos'
})
export class SecondApiService {
  constructor(protected http: HttpClient) {}

  @Get()
  get(): Observable<any> {
    return new JsonRequest();
  }
}
