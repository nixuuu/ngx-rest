import {
  HttpClient,
  HttpClientModule,
  HttpHeaders
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Methods } from '../../enums/methods';
import { Headers } from '../../types/request/headers';
import { BaseRequest } from './base.request';
import createSpyObj = jasmine.createSpyObj;
import SpyObj = jasmine.SpyObj;

const headersToObject = (headers?: Headers) => {
  headers = headers ?? new HttpHeaders();
  if (!(headers instanceof HttpHeaders)) {
    return headers;
  }
  const result: { [key: string]: string } = {};
  for (const key of headers.keys()) {
    result[key] = headers.get(key) ?? '';
  }
  return result;
};

describe('BaseRequest', () => {
  let request: BaseRequest<any>;
  let httpClient: HttpClient;
  let spyHttpClient: SpyObj<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    httpClient = TestBed.inject(HttpClient);
    spyHttpClient = createSpyObj('HttpClient', ['request']);
    request = new BaseRequest<any>();
    request.httpClient(spyHttpClient as any as HttpClient);
  });
  it('should create an instance', () => {
    expect(request).toBeTruthy();
  });
  it('should merge headers', () => {
    request.header('x-test', '1');
    request.header('x-test', '2');
    request.header('x-test', '3');
    const headers = headersToObject(request['httpOptions'].headers);
    expect(headers).toEqual({ 'x-test': '3' });
  });
  it('should merge headers', () => {
    request.header('x-test', '1').header('x-test', '2').header('x-test', '3');
    const headers = headersToObject(request['httpOptions'].headers);
    expect(headers).toEqual({ 'x-test': '3' });
  });
  it('should merge headers', () => {
    request.header('x-test', '1');
    request.headers({ 'x-test': '2' });
    request.headers({ 'x-test': '3' });
    const headers = headersToObject(request['httpOptions'].headers);
    expect(headers).toEqual({ 'x-test': '3' });
  });
  it('should merge headers', () => {
    request
      .header('x-test', '1')
      .headers({ 'x-test2': '2' })
      .headers({ 'x-test': '3' });
    const headers = headersToObject(request['httpOptions'].headers);
    expect(headers).toEqual({
      'x-test': '3',
      'x-test2': '2'
    });
  });
  it('should merge headers', () => {
    request
      .header('x-test', '1')
      .headers({ 'x-test2': '2' })
      .header('x-test', '3');
    const headers = headersToObject(request['httpOptions'].headers);
    expect(headers).toEqual({
      'x-test': '3',
      'x-test2': '2'
    });
  });
  it('should add params', () => {
    request.params({ 'x-test': '3' });
    expect(request['urlParams']).toEqual({ 'x-test': '3' });
  });
  it('should add params', () => {
    request.params({ 'x-test': '3' });
    expect(request['urlParams']).toEqual({ 'x-test': '3' });
  });
  it('should set http client', () => {
    expect(request['http']).toBeTruthy();
  });

  it('should make GET request', (done) => {
    spyHttpClient.request.and.returnValue(of({ test: 1 }));

    request
      .method(Methods.GET)
      .mergeApiClientOptions({
        baseUrl: 'http://localhost:3000'
      })
      .path('/api');

    expect(request['requestMethod']).toEqual(Methods.GET);
    expect(request['baseUrl']).toEqual('http://localhost:3000');
    expect(request['requestPath']).toEqual('/api');

    request.subscribe((response) => {
      expect(response).toEqual({ test: 1 });
      done();
    });
  });

  it('should make GET request with url params', (done) => {
    const promises: Promise<any>[] = [];
    const testMethod = (method: Methods) => {
      const req = new BaseRequest<any>();
      req.httpClient(spyHttpClient as any as HttpClient);
      let resolve: (value: any) => void;
      const promise = new Promise((res) => (resolve = res));
      promises.push(promise);
      spyHttpClient.request.and
        .callThrough()
        .and.callFake((method2: any, url?: any, params?: any) => {
          expect(method).toEqual(method);
          expect(url).toEqual('http://localhost:3000/users/1');
          return of({ test: 1 }) as Observable<any>;
        });

      req
        .params({ id: 1 })
        .method(method)
        .mergeApiClientOptions({
          baseUrl: 'http://localhost:3000'
        })
        .path('/users/:id');

      expect(req['requestMethod']).toEqual(method);
      expect(req['baseUrl']).toEqual('http://localhost:3000');
      expect(req['requestPath']).toEqual('/users/:id');

      req.subscribe((response) => {
        expect(response).toEqual({ test: 1 });
        resolve(response);
      });
    };

    for (const method of Object.values(Methods)) {
      testMethod(method);
    }

    Promise.all(promises).then(() => done());
  });
});
