import { HttpContext, HttpContextToken } from '@angular/common/http';

export const NgxApiToken = new HttpContextToken<boolean>(() => true);
export const NgxApiContext = new HttpContext().set(NgxApiToken, true);
