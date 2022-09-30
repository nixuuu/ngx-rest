import {Injectable} from '@angular/core';
import {ApiClient, Get, NgxRestService, Post, Request} from "ngx-rest";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root',})
@ApiClient('todos')
export class UsersService {
  constructor(protected http: NgxRestService) {
  }

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
}
