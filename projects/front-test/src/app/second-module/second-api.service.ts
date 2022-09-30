import { Injectable } from '@angular/core';
import {ApiClient, Get, NgxRestService, Request} from "ngx-rest";
import {Observable} from "rxjs";
import {SecondModuleModule} from "./second-module.module";

@Injectable({
  providedIn: SecondModuleModule
})
@ApiClient('photos')
export class SecondApiService {
  constructor(protected http: NgxRestService) {
  }

  @Get()
  get(): Observable<any> {
    return new Request({})
  }
}
