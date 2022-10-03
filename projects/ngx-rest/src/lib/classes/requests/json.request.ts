import { BaseRequest } from './base.request';

/**
 * @description JSON response type
 */
export class JsonRequest<T = any> extends BaseRequest<T> {
  constructor() {
    super();
    this.httpOptions.responseType = 'json';
  }
}
