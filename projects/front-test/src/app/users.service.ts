import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ApiClient,
  ArrayBufferRequest,
  BlobRequest,
  Get,
  JsonRequest,
  Post
} from 'ngx-rest';
import { UserListResponse } from './classes/UserListResponse';

@Injectable({ providedIn: 'root' })
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com/todos'
})
export class UsersService {
  constructor(protected http: HttpClient) {}

  @Get()
  list() {
    return new ArrayBufferRequest();
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
