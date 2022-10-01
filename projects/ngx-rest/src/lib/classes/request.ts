import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import {
  ApiClientParamsOptions,
  Methods,
  QueryParamValue
} from '../decorators';
import { JoinBaseUrl } from '../helpers/join-base-url';
import { joinUrl } from '../helpers/join-url';
import { mapUrlParameters } from '../helpers/map-url-parameters';

export type Headers =
  | HttpHeaders
  | {
      [header: string]: string | string[];
    };

export interface RequestOptionsProps {
  baseUrl?: string;
  context?: HttpContext;
  queryParams?: any;
  body?: any;
  headers?: Headers;
  observe?: any;
  params?: any;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
}

export class Request<T, K = any>
  extends Observable<T>
  implements RequestOptionsProps
{
  baseUrl?: string;
  context?: HttpContext;
  queryParams?: { [key: string]: QueryParamValue };
  body?: K;
  headers?: Headers;
  observe?: 'body' | 'events' | 'response';
  params?: { [param: string]: string };
  reportProgress?: boolean;
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
  withCredentials?: boolean;

  controllerOptions?: ApiClientParamsOptions;

  private subscriber?: Subscriber<T>;

  constructor(props?: RequestOptionsProps) {
    super((subscriber) => {
      this.subscriber = subscriber;
    });

    Object.assign(this, props ?? {});
  }

  mergeApiClientOptions(options: ApiClientParamsOptions) {
    this.controllerOptions = options;
    this.baseUrl = options.baseUrl ?? this.baseUrl;
    this.queryParams = {
      ...(this.queryParams ?? {}),
      ...(options.queryParams ?? {})
    };
    this.headers = { ...(this.headers ?? {}), ...(options.headers ?? {}) };
    options.httpContext && this.mergeContext(options.httpContext);
  }

  private mergeContext(context: HttpContext) {
    if (!this.context) {
      this.context = context;
      return;
    }
    for (const token of context.keys()) {
      this.context.set(token, context.get(token));
    }
  }

  toHttpOptions(): any {
    return {
      body: this.body,
      headers: this.headers,
      observe: this.observe,
      params: new HttpParams({ fromObject: this.queryParams ?? {} }),
      reportProgress: this.reportProgress,
      responseType: this.responseType,
      withCredentials: this.withCredentials
    };
  }

  public makeRequest(method: Methods, path: string, http?: HttpClient): this {
    if (!http) {
      throw new Error('HttpClient is not provided');
    }
    path = joinUrl(this.controllerOptions?.path ?? '', path);

    const baseUrl = this.baseUrl ?? this.controllerOptions?.baseUrl;
    path = JoinBaseUrl(path, baseUrl ?? '');
    path = mapUrlParameters(path, this.params ?? {});

    const httpRequest = http.request(
      method,
      path,
      this.toHttpOptions()
    ) as unknown as Observable<T>;

    httpRequest.subscribe({
      next: this.subscriber?.next,
      error: this.subscriber?.error,
      complete: this.subscriber?.complete
    });

    return this;
  }
}
