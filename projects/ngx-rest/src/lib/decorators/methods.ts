import {HttpContext, HttpContextToken, HttpHeaders, HttpParams} from "@angular/common/http";
import {filter, Observable, OperatorFunction} from "rxjs";
import {NgxRestService} from "../ngx-rest.service";
import "reflect-metadata";

const joinUrl = (...args: string[]) => {
  const argsParts = args.map((arg) => arg.split('/'));
  const parts = argsParts.flat();
  return parts.filter(Boolean).join('/');
}

export enum Methods {
  GET = 'get',
  HEAD = 'head',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  CONNECT = 'connect',
  OPTIONS = 'options',
  TRACE = 'trace',
  PATCH = 'patch',
}

type Headers = HttpHeaders | {
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
export class Request<T, K = any> extends Observable<T> implements RequestOptionsProps {
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

  constructor(props?: RequestOptionsProps) {
    super();
    Object.assign(this, props ?? {});
  }

  mergeApiClientOptions(options: ApiClientParamsOptions) {
    this.baseUrl = options.baseUrl ?? this.baseUrl;
    this.queryParams = {...(this.queryParams ?? {}), ...(options.queryParams ?? {})};
    this.headers = {...(this.headers ?? {}), ...(options.headers ?? {})};
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
      params: new HttpParams({fromObject: this.queryParams ?? {}}),
      reportProgress: this.reportProgress,
      responseType: this.responseType,
      withCredentials: this.withCredentials,
    };
  }
}
export type RqOp<T> = Extract<Request<T>, Observable<T>>;
export type BaseService = {
  http: NgxRestService;
  [key: string]: any;
}

const NGX_API_CLIENT_OPTIONS = Symbol('NGX_API_CLIENT_OPTIONS');
type QueryParamValue = string | number | boolean | ReadonlyArray<string | number | boolean>;
interface ApiClientParamsOptions {
  baseUrl?: string;
  queryParams?: {[key: string]: QueryParamValue};
  httpContext?: HttpContext;
  headers?: {[key: string]: string};
  path?: string;
  pipes?: OperatorFunction<any, any>[];
}
type ApiClientParams = string | ApiClientParamsOptions;

export const ApiClient = (params: ApiClientParams) => {
  return <T>(constructor: T): T => {
    Reflect.defineMetadata(NGX_API_CLIENT_OPTIONS, params, constructor);
    return constructor;
  }
}

const httpServiceMap = new WeakMap<any, NgxRestService>();

const GetNgxRestService = (target: any): NgxRestService => {
  if (!httpServiceMap.has(target)) {
    for (const prop of Object.getOwnPropertyNames(target)) {
      if (target[prop] instanceof NgxRestService) {
        httpServiceMap.set(target, target[prop]);
        break;
      }
    }
  }

  return httpServiceMap.get(target) || target.http;
}

export const NgxApiToken = new HttpContextToken<boolean>(() => true);
export const NgxApiContext = new HttpContext().set(NgxApiToken, true);

const patchMethod = (method: Methods, path: string, originalMethod: any) => {
  return function<T = unknown>(this: BaseService, ...args: any[]): Observable<T> {
    const http = GetNgxRestService(this);
    let controllerOptions: ApiClientParams = Reflect.getMetadata(NGX_API_CLIENT_OPTIONS, this.constructor);
    if (typeof controllerOptions === 'string') {
      controllerOptions = {path: controllerOptions};
    }

    path = joinUrl(controllerOptions.path ?? '', path);

    const options: Request<T> = originalMethod(...args);

    options.mergeApiClientOptions(controllerOptions);

    return http.request<T>(method, path, options);
  }
}

const MethodDecorator = (method: Methods) => (path?: string, options?: any) => {
  return <T>(target: T, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    path = path ?? '';

    return {
      ...descriptor,
      value: patchMethod(method, path, originalMethod),
    };
  }
}

export const Get = MethodDecorator(Methods.GET);
export const Post = MethodDecorator(Methods.POST);
