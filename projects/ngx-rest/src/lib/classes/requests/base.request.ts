import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { ApiClientParamsOptions, QueryParamValue } from '../../decorators';
import { Methods } from '../../enums/methods';
import { JoinBaseUrl } from '../../helpers/join-base-url';
import { joinUrl } from '../../helpers/join-url';
import { mapUrlParameters } from '../../helpers/map-url-parameters';
import { Constructor } from '../../types/constructor.type';
import { Headers } from '../../types/request/headers';
import { RequestOptionsProps } from '../../types/request/requestOptionsProps';

export class BaseRequest<T, K = any>
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
  response?: Constructor<T>;

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

    httpRequest
      .pipe(
        map((requestResponse) =>
          this.response ? new this.response(requestResponse) : requestResponse
        )
      )
      .subscribe({
        next: (response) => this.subscriber?.next(response),
        error: (error) => this.subscriber?.error(error),
        complete: () => this.subscriber?.complete()
      });

    return this;
  }

  map(response: Constructor<T>): this {
    this.response = response;
    return this;
  }
}
