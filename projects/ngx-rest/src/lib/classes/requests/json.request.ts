import { BaseRequest } from './base.request';

export class JsonRequest<T = any> extends BaseRequest<T> {
  override responseType: 'json' = 'json';
}
