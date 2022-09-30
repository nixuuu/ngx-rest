import {HttpClient, HttpEvent} from "@angular/common/http";
import {Inject, Injectable, InjectionToken, Optional} from "@angular/core";
import {Methods, Request} from "./decorators";
import {Observable} from "rxjs";
import {NgxRestModule} from "./ngx-rest.module";

export interface NgxRestServiceOptions {
  baseUrl?: string;
}
export const NGX_REST_OPTIONS = new InjectionToken<NgxRestServiceOptions>('NGX_REST_OPTIONS', {
  providedIn: 'root',
  factory: () => ({}),
});

@Injectable({ providedIn: NgxRestModule })
export class NgxRestService {
  constructor(private http: HttpClient,
              @Optional() @Inject(NGX_REST_OPTIONS)
              private options: NgxRestServiceOptions,
  ) {
    console.log(this.options);
  }

  request<T>(method: Methods, url: string, options?: Request<T>): Observable<T> {
    console.log('request', method, url, options);
    const baseUrl = options?.baseUrl ?? this.options.baseUrl;
    url = new URL(url, baseUrl).toString();

    if (options?.params) {
      Object.entries<any>(options.params).forEach(([key, value]) => {
        try {
          value = JSON.stringify(value);
        } catch (e) {
          value = value?.toString();
        }
        url = url.replace(new RegExp(`:${key}`, 'g'), value);
      });
    }
    return this.http.request(method, url, options?.toHttpOptions()) as any;
  }
}
