import { mapUrlParameters } from './map-url-parameters';

describe('mapUrlParameters', () => {
  it('should return url if parameters is not defined', () => {
    expect(mapUrlParameters('url', undefined)).toBe('url');
  });
  it('should return url if parameters is empty', () => {
    expect(mapUrlParameters('url', {})).toBe('url');
  });
  it('should return url if parameters is null', () => {
    expect(mapUrlParameters('url', null)).toBe('url');
  });
  it('should return url if parameters are string', () => {
    expect(mapUrlParameters('url', 'string')).toBe('url');
  });
  it('should return url if parameters are number', () => {
    expect(mapUrlParameters('url', 0)).toBe('url');
  });
  it('should return url if parameters are boolean', () => {
    expect(mapUrlParameters('url', true)).toBe('url');
  });
  it('should return url if parameters are array', () => {
    expect(mapUrlParameters('url', [])).toBe('url');
  });
  it('should replace :id with 1', () => {
    expect(mapUrlParameters('url/:id', { id: 1 })).toBe('url/1');
  });
  it('should replace :id with 1 and :name with "name"', () => {
    expect(mapUrlParameters('url/:id/:name', { id: 1, name: 'name' })).toBe(
      'url/1/name'
    );
  });
  it('should replace :id with 1 and :slug with "slug"', () => {
    expect(mapUrlParameters('url/:id-:slug', { id: 1, slug: 'slug' })).toBe(
      'url/1-slug'
    );
  });
  it('should stringify object value', () => {
    expect(mapUrlParameters('url/:id', { id: { a: 1 } })).toBe('url/{"a":1}');
  });
  it('should stringify array value', () => {
    expect(mapUrlParameters('url/:id', { id: [1, 2] })).toBe('url/[1,2]');
  });
  it('should not stringify circular object value', () => {
    const obj: any = { a: 1 };
    obj['b'] = obj;
    expect(mapUrlParameters('url/:id', { id: obj })).toBe(
      'url/[object Object]'
    );
  });
});
