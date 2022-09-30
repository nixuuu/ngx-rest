import {Injectable} from "@angular/core";
import {ApiClient, Request, NgxRestService, Get} from 'ngx-rest';
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {MyDataResponse} from "../interfaces/my-data";

@Injectable({ providedIn: 'root' })
@ApiClient({
  baseUrl: 'https://jsonplaceholder.typicode.com/',
  queryParams: {
    apiKey: environment.apiKey
  }
})
export class AuthService {
  constructor(protected http: NgxRestService) {
  }

  @Get('posts/:id')
  login(id: any): Observable<MyDataResponse> {
    return new Request<MyDataResponse>({
      queryParams: {
        page: 2
      },
      params: { id }
    });
  }
}
