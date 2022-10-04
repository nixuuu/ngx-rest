import { HttpContext, HttpContextToken } from '@angular/common/http';

export const NgxAuthenticatedToken = new HttpContextToken<boolean>(() => true);
export const NgxAuthenticatedContext = new HttpContext().set(
  NgxAuthenticatedToken,
  true
);
