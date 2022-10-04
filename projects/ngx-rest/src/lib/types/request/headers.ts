import { HttpHeaders } from '@angular/common/http';

export type HeadersObject = { [key: string]: string | string[] };

export type Headers = HttpHeaders | HeadersObject;
