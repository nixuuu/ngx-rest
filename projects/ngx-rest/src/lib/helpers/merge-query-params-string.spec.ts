import { mergeQueryParamsString } from './merge-query-params-string';

describe('mergeQueryParamsString', () => {
  it('should merge query params string', () => {
    expect(mergeQueryParamsString(['a=1', 'b=2'])).toEqual({ a: '1', b: '2' });
  });
  it('should merge same query params string into one property', () => {
    expect(mergeQueryParamsString(['a=1', 'a=2'])).toEqual({ a: '2' });
  });
  it('should merge query params string with empty value', () => {
    expect(mergeQueryParamsString(['a=1', 'b='])).toEqual({ a: '1', b: '' });
  });
  it('should merge query params string with empty key', () => {
    expect(mergeQueryParamsString(['=1', 'b=2'])).toEqual({ b: '2' });
  });
  it('should merge query params string with empty key and value', () => {
    expect(mergeQueryParamsString(['='])).toEqual({});
  });
});
