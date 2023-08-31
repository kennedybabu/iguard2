import { TestBed } from '@angular/core/testing';

import { GetCompanyDetailsService } from './get-company-details.service';

describe('GetCompanyDetailsService', () => {
  let service: GetCompanyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
