import { JoinBaseUrl } from './join-base-url';

describe('JoinBaseUrl', () => {
  it('should join path without slash to base url without slash', () => {
    expect(JoinBaseUrl('api', 'http://localhost:4200')).toBe(
      'http://localhost:4200/api'
    );
  });
  it('should join path without slash to base url with slash', () => {
    expect(JoinBaseUrl('api', 'http://localhost:4200/')).toBe(
      'http://localhost:4200/api'
    );
  });
  it('should join path with slash to base url with slash', () => {
    expect(JoinBaseUrl('/api', 'http://localhost:4200/')).toBe(
      'http://localhost:4200/api'
    );
  });
  it('should join path to base url with query params', () => {
    expect(JoinBaseUrl('/api', 'http://localhost:4200?test=1')).toBe(
      'http://localhost:4200/api'
    );
  });
  it('should join path with query params to base url with query params', () => {
    expect(JoinBaseUrl('/api?test=1', 'http://localhost:4200?test=2')).toBe(
      'http://localhost:4200/api?test=1'
    );
  });
});
