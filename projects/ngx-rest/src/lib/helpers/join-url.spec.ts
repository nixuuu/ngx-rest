import { joinUrl } from './join-url';

describe('joinUrl', () => {
  it('should join paths', () => {
    expect(joinUrl('api', 'users')).toBe('api/users');
  });
  it('should join paths with slash', () => {
    expect(joinUrl('api/', '/users')).toBe('api/users');
  });
  it('should join paths with slash and empty string', () => {
    expect(joinUrl('api/', '', '/users')).toBe('api/users');
  });
  it('should join paths with multiple slashes and empty string', () => {
    expect(joinUrl('api/////', '', '/users')).toBe('api/users');
  });
  it('should join paths with query params', () => {
    expect(joinUrl('api?test=1', 'users?b=2')).toBe('api/users?test=1&b=2');
  });
  it('should join paths with query params and empty strings', () => {
    expect(joinUrl('api?test=1', '', 'users?b=2')).toBe('api/users?test=1&b=2');
  });
  it('should join paths with query params and empty strings', () => {
    expect(joinUrl('api?test=1', '', 'users?test=2')).toBe('api/users?test=2');
  });
});
