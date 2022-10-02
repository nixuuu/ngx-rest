import { BaseRequest } from './base.request';

export class TextRequest extends BaseRequest<string> {
  override responseType: 'text' = 'text';
}
