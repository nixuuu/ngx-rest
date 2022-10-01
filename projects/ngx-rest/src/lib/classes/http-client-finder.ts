import { HttpClient } from '@angular/common/http';
import { ProviderFinder } from './provider-finder';

export class HttpClientFinder extends ProviderFinder<HttpClient> {
  static getHttpClient(target: any): HttpClient | undefined {
    return HttpClientFinder.getInstance().getProvider(target);
  }
  private static instance: HttpClientFinder;
  private static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClientFinder();
    }
    return this.instance;
  }
  constructor() {
    super(HttpClient);
  }
}
