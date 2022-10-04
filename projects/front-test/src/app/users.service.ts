import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, BlobRequest, Get, JsonRequest, Post } from 'ngx-rest';
import { BaseClient } from './base-client';
import { UserListResponse } from './classes/UserListResponse';

@Injectable({ providedIn: 'root' })
@ApiClient('todos')
export class UsersService extends BaseClient {
  constructor(protected http: HttpClient) {
    super();
  }

  @Get()
  list() {
    return new JsonRequest().header('x-test2', '2').headers({
      'x-test3': '3',
      'x-test': '4'
    });
  }

  @Post()
  addUser() {
    return new BlobRequest();
  }

  @Get()
  async listAsync() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new JsonRequest().map(UserListResponse);
  }
}
