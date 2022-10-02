import { HttpContext } from '@angular/common/http';
import { Constructor } from '../constructor.type';
import { Headers } from './headers';

export interface RequestOptionsProps {
  baseUrl?: string;
  context?: HttpContext;
  queryParams?: any;
  body?: any;
  headers?: Headers;
  observe?: 'body' | 'events' | 'response';
  params?: any;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  response?: Constructor;
}
