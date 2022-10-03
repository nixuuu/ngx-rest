import { HttpContext } from '@angular/common/http';
import { Constructor } from '../constructor.type';
import { Headers } from './headers';

export interface RequestOptionsProps<K = any> {
  context?: HttpContext;
  body?: K;
  headers?: Headers;
  observe?: 'body' | 'events' | 'response';
  params?: any;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  response?: Constructor;
}
