import { BaseRequest } from './base.request';

export class BlobRequest<T> extends BaseRequest<T> {
  constructor() {
    super();
    this.httpOptions.responseType = 'blob';
  }
}
