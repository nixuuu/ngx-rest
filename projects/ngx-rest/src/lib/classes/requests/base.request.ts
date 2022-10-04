import {
  HttpClient,
  HttpContext,
  HttpHeaders,
  HttpParams
} from '@angular/common/http';
import {
  map,
  Observable,
  Observer,
  OperatorFunction,
  Subscription
} from 'rxjs';
import { Subscriber } from 'rxjs/internal/Subscriber';
import { ApiClientParamsOptions } from '../../decorators';
import { Methods } from '../../enums/methods';
import { JoinBaseUrl } from '../../helpers/join-base-url';
import { joinUrl } from '../../helpers/join-url';
import { mapUrlParameters } from '../../helpers/map-url-parameters';
import { Constructor } from '../../types/constructor.type';
import { Headers, HeadersObject } from '../../types/request/headers';
import { RequestOptionsProps } from '../../types/request/requestOptionsProps';

export class BaseRequest<T, K = any> extends Observable<T> {
  controllerOptions?: ApiClientParamsOptions;
  protected httpOptions: RequestOptionsProps<K> = {
    context: new HttpContext()
  };
  private requestPath: string = '';
  private urlParams: any = {};
  private requestMethod: Methods = Methods.GET;
  private baseUrl?: string;
  private pipes: OperatorFunction<any, any>[] = [];
  private http?: HttpClient;
  private responseMapConstructor?: Constructor<T>;
  private subscriber?: Subscriber<T>;

  constructor() {
    super((subscriber) => {
      this.subscriber = subscriber;
    });
  }

  mergeApiClientOptions(options: ApiClientParamsOptions) {
    const queryParams = this.httpOptions.params ?? {};
    const headers = this.httpOptions.headers ?? {};

    this.controllerOptions = options;
    this.baseUrl = options.baseUrl ?? this.baseUrl;
    this.httpOptions.params = {
      ...queryParams,
      ...(options.queryParams ?? {})
    };
    this.httpOptions.headers = this.mergeHeaders(options.headers, headers);
    options.httpContext && this.mergeContexts(options.httpContext);

    return this;
  }

  header(key: string, value: string): this {
    const { headers } = this.httpOptions;
    this.httpOptions.headers = this.mergeHeaders(headers, { [key]: value });
    return this;
  }

  /**
   *
   * @param newHeaders
   */
  headers(newHeaders: HeadersObject): this {
    const { headers } = this.httpOptions;
    this.httpOptions.headers = this.mergeHeaders(headers, newHeaders);
    return this;
  }

  method(method: Methods): this {
    this.requestMethod = method;
    return this;
  }

  path(url: string): this {
    this.requestPath = url;
    return this;
  }

  map(response: Constructor<T>): this {
    this.responseMapConstructor = response;
    return this;
  }

  httpClient(http: HttpClient): this {
    this.http = http;
    return this;
  }

  params(params: any, force = false): this {
    if (this.httpOptions.params && !force) {
      throw new Error('Params already defined');
    }
    this.urlParams = params;
    return this;
  }

  queryParams(params: any): this {
    this.httpOptions.params = params;
    return this;
  }

  addParams(params: any): this {
    this.urlParams = { ...this.urlParams, ...params };
    return this;
  }

  body(body: any, force = false): this {
    if (this.httpOptions.body && !force) {
      throw new Error('Body already defined');
    }
    this.httpOptions.body = body;
    return this;
  }

  public override subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ): Subscription {
    this.validateRequest();
    // @ts-ignore
    const subscription = super.subscribe(observerOrNext, error, complete);

    const { http, requestMethod: method } = this;
    let path = this.requestPath;
    path = joinUrl(this.controllerOptions?.path ?? '', path);

    const baseUrl = this.baseUrl ?? this.controllerOptions?.baseUrl;
    path = JoinBaseUrl(path, baseUrl ?? '');
    path = mapUrlParameters(path, this.urlParams);

    if (/:[a-z]+/i.test(path)) {
      console.warn(`Path ${path} contains not mapped parameters`);
    }

    let observableObject = http!.request(
      method,
      path,
      this.toHttpOptions()
    ) as unknown as Observable<T>;

    const pipes = [...this.pipes];
    if (this.responseMapConstructor) {
      pipes.push(
        map(
          (requestResponse) => new this.responseMapConstructor!(requestResponse)
        )
      );
    }
    if (pipes.length > 0) {
      observableObject = observableObject.pipe(...(pipes as []));
    }

    observableObject.subscribe(this.subscriber);

    return subscription;
  }

  public override pipe(
    ...operations: OperatorFunction<any, any>[]
  ): Observable<T> {
    this.pipes.push(...operations);
    return this;
  }

  private mergeContexts(newContext: ApiClientParamsOptions['httpContext']) {
    let { context } = this.httpOptions;
    if (!context) {
      context = new HttpContext();
    }

    if (newContext instanceof HttpContext) {
      this.mergeContextValues(context, newContext);
    } else if (Array.isArray(newContext)) {
      for (const [token, value] of newContext) {
        context.set(token, value ?? token.defaultValue());
      }
    }

    this.httpOptions.context = context;
  }

  private mergeHeaders(headers?: Headers, newHeaders?: Headers) {
    headers = headers ?? {};
    newHeaders = newHeaders ?? {};

    if (!(headers instanceof HttpHeaders)) {
      headers = new HttpHeaders(headers);
    }
    if (!(newHeaders instanceof HttpHeaders)) {
      newHeaders = new HttpHeaders(newHeaders);
    }

    const headersKeys = newHeaders.keys();

    for (const key of headersKeys) {
      const headerValue = newHeaders.get(key);
      headers = headers.set(key, headerValue ?? '');
    }

    return headers;
  }

  private mergeContextValues(context: HttpContext, newContext: HttpContext) {
    for (const token of newContext.keys()) {
      context.set(token, newContext.get(token));
    }
    return context;
  }

  private toHttpOptions(): any {
    return {
      ...this.httpOptions,
      params: new HttpParams({ fromObject: this.httpOptions.params ?? {} })
    };
  }

  private validateRequest() {
    if (!this.http) {
      throw new Error('HttpClient is not provided');
    }
    const allowedMethodsWithBody = [Methods.POST, Methods.PUT, Methods.PATCH];
    if (
      !allowedMethodsWithBody.includes(this.requestMethod) &&
      this.httpOptions.body
    ) {
      throw new Error('Body is not allowed');
    }
  }
}
