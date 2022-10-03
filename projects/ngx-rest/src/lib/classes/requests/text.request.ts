import { BaseRequest } from './base.request';

export class TextRequest extends BaseRequest<string> {
  constructor() {
    super();
    this.httpOptions.responseType = 'text';
  }
}
