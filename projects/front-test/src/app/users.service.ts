import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiClient, Get, Post, Request } from 'ngx-rest';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com/todos'
})
export class UsersService {
  constructor(protected http: HttpClient) {}

  @Get()
  list(): Observable<any> {
    return new Request<any>({});
  }

  @Post()
  addUser(user: any): Observable<any> {
    return new Request({
      body: user
    });
  }

  @Get()
  async listAsync() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Request<{ test: string }>({});
  }
}
