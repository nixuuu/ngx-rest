import { HttpHeaders } from '@angular/common/http';

export type Headers =
  | HttpHeaders
  | {
      [header: string]: string | string[];
    };
