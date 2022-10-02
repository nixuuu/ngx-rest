import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseRequest } from './classes/requests/base.request';
import { Methods } from './enums/methods';
import { JoinBaseUrl } from './helpers/join-base-url';
import { joinUrl } from './helpers/join-url';
import { mapUrlParameters } from './helpers/map-url-parameters';
import { NgxRestModule } from './ngx-rest.module';

export interface NgxRestServiceOptions {
  baseUrl?: string;
}
export const NGX_REST_OPTIONS = new InjectionToken<NgxRestServiceOptions>(
  'NGX_REST_OPTIONS',
  {
    providedIn: 'root',
    factory: () => ({})
  }
);

@Injectable({ providedIn: NgxRestModule })
export class NgxRestService {
  constructor(
    private http: HttpClient,
    @Optional()
    @Inject(NGX_REST_OPTIONS)
    private options: NgxRestServiceOptions
  ) {
    console.log(this.options);
  }

  request<T>(
    method: Methods,
    url: string,
    options: BaseRequest<T>
  ): Observable<T> {
    console.log('request', method, url, options);
    const baseUrl = options?.baseUrl ?? this.options.baseUrl;
    url = joinUrl(options.controllerOptions?.path ?? '', url);
    url = JoinBaseUrl(url, baseUrl ?? '');
    url = mapUrlParameters(url, options?.params ?? {});
    return this.http.request(method, url, options?.toHttpOptions()) as any;
  }
}
