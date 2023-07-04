import { TestBed } from '@angular/core/testing';

import { FormDataServiceService } from './form-data-service.service';

describe('FormDataServiceService', () => {
  let service: FormDataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormDataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
