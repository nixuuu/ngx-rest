import { BaseRequest } from './base.request';

export class ArrayBufferRequest extends BaseRequest<ArrayBuffer> {
  constructor() {
    super();
    this.httpOptions.responseType = 'arraybuffer';
  }
}
