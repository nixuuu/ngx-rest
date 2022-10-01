import { NgxRestService } from '../ngx-rest.service';
import { ProviderFinder } from './provider-finder';

export class NgxServiceFinder extends ProviderFinder<NgxRestService> {
  static getNgxService(target: any): NgxRestService | undefined {
    return NgxServiceFinder.getInstance().getProvider(target);
  }
  private static instance: NgxServiceFinder;
  private static getInstance() {
    if (!this.instance) {
      this.instance = new NgxServiceFinder();
    }
    return this.instance;
  }
  constructor() {
    super(NgxRestService);
  }
}
