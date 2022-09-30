import {HttpClientModule} from "@angular/common/http";
import { TestBed } from '@angular/core/testing';

import { NgxRestService } from './ngx-rest.service';

describe('NgxRestService', () => {
  let service: NgxRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(NgxRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a request method', () => {
    expect(service.request).toBeTruthy();
  });
});
