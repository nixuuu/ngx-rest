import {HttpClientModule} from "@angular/common/http";
import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NGX_REST_OPTIONS, NgxRestServiceOptions} from "./ngx-rest.service";

@NgModule({
  imports: [
    HttpClientModule,
  ],
  exports: [
    HttpClientModule,
  ]
})
export class NgxRestModule {
  constructor(@Optional() @SkipSelf() parentModule?: NgxRestModule) {
    if (parentModule) {
      throw new Error(
        'NgxRestModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(options: NgxRestServiceOptions = {}): ModuleWithProviders<NgxRestModule> {
    return {
      ngModule: NgxRestModule,
      providers: [
        {
          provide: NGX_REST_OPTIONS,
          useValue: options
        },
      ],
    };
  }
}
