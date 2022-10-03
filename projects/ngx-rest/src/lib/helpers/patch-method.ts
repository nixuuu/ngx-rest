import { Subscribable } from 'rxjs';
import { isPromise } from 'rxjs/internal/util/isPromise';
import { HttpClientFinder } from '../classes/http-client-finder';
import { BaseRequest } from '../classes/requests/base.request';
import {
  ApiClientParams,
  ApiClientParamsOptions,
  NGX_API_CLIENT_OPTIONS
} from '../decorators';
import { Methods } from '../enums/methods';

export const patchMethod = (method: Methods, path: string, callback: any) => {
  return function <T = any>(
    this: any,
    ...args: any[]
  ): PromiseLike<Subscribable<T>> | Subscribable<T> {
    const http = HttpClientFinder.getHttpClient(this);

    if (!http) {
      throw new Error('HttpClient not found');
    }

    let controllerOptions: ApiClientParams = Reflect.getMetadata(
      NGX_API_CLIENT_OPTIONS,
      this.constructor
    );

    if (typeof controllerOptions === 'string') {
      controllerOptions = { path: controllerOptions };
    }

    const handleSyncCallback = (
      result: BaseRequest<T>
    ): PromiseLike<Subscribable<T>> | Subscribable<T> => {
      result.mergeApiClientOptions(controllerOptions as ApiClientParamsOptions);

      return result
        .mergeApiClientOptions(controllerOptions as ApiClientParamsOptions)
        .method(method)
        .path(path)
        .httpClient(http);
    };

    const options: BaseRequest<T> | Promise<BaseRequest<T>> = callback(...args);

    return isPromise(options)
      ? options.then(handleSyncCallback)
      : handleSyncCallback(options);
  };
};
