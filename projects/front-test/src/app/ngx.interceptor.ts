import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxApiToken, NgxAuthenticatedToken } from 'ngx-rest';
import { Observable } from 'rxjs';

@Injectable()
export class NgxInterceptor implements HttpInterceptor {
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Omit intercept of the request if it's not an API request
    if (!req.context.get(NgxApiToken)) {
      return next.handle(req);
    }

    // Add authorization header if the request is authenticated
    if (req.context.get(NgxAuthenticatedToken)) {
      req = this.addAuthorization(req);
    }

    return next.handle(req);
  }

  private addAuthorization(req: HttpRequest<any>): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: 'Bearer <TOKEN>'
      }
    });
  }
}
