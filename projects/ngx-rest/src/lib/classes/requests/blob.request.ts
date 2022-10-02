import { BaseRequest } from './base.request';

export class BlobRequest<T> extends BaseRequest<T> {
  override responseType: 'blob' = 'blob';
}
