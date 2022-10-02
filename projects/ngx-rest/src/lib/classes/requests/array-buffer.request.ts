import { BaseRequest } from './base.request';

export class ArrayBufferRequest extends BaseRequest<ArrayBuffer> {
  override responseType: 'arraybuffer' = 'arraybuffer';
}
