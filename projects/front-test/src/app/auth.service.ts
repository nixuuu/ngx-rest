import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, Get, JsonRequest, Post } from 'ngx-rest';
import { BaseResponse } from '../interfaces/base-response';

@Injectable({ providedIn: 'root' })
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  path: 'posts'
})
export class AuthService {
  constructor(protected http: HttpClient) {}

  @Get(':id')
  singlePost(id: any) {
    return new JsonRequest()
      .params({ id })
      .queryParams({ sort: 'desc' })
      .map(BaseResponse);
  }

  @Post()
  addPost() {
    return new JsonRequest().body({ name: 'test' }).map(BaseResponse);
  }
}
