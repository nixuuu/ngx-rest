import { HttpContextToken } from '@angular/common/http';
import { NgxApiContext, NgxApiToken } from './api-context';

describe('NgxApiToken', () => {
  it('should be HttpContextToken', () => {
    expect(NgxApiToken).toBeInstanceOf(HttpContextToken);
  });
  it('should have default value to be true', () => {
    expect(NgxApiToken.defaultValue()).toBe(true);
  });
});

describe('NgxApiContext', () => {
  it('should have NgxApiToken', () => {
    expect(NgxApiContext.get(NgxApiToken)).toBe(true);
  });
});
