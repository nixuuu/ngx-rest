import { NgxRestService } from '../ngx-rest.service';

export type BaseService = {
  http: NgxRestService;
  [key: string]: any;
};
