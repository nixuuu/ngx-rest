import { Observable } from 'rxjs';
import { HttpClientFinder } from '../classes/http-client-finder';
import { NgxServiceFinder } from '../classes/ngx-service-finder';
import {
  ApiClientParams,
  NGX_API_CLIENT_OPTIONS,
  Request
} from '../decorators';
import { Methods } from '../enums/methods';

export const patchMethod = (
  method: Methods,
  path: string,
  originalMethod: any
) => {
  return function <T = unknown>(this: any, ...args: any[]): Observable<T> {
    const ngxRest = NgxServiceFinder.getNgxService(this);
    const http = HttpClientFinder.getHttpClient(this);

    if (!ngxRest && !http) {
      throw new Error('NgxRestService or HttpClient not found');
    }

    let controllerOptions: ApiClientParams = Reflect.getMetadata(
      NGX_API_CLIENT_OPTIONS,
      this.constructor
    );
    if (typeof controllerOptions === 'string') {
      controllerOptions = { path: controllerOptions };
    }

    const options: Request<T> = originalMethod(...args);

    options.mergeApiClientOptions(controllerOptions);

    return ngxRest
      ? ngxRest.request<T>(method, path, options)
      : options.makeRequest(method, path, http);
  };
};
