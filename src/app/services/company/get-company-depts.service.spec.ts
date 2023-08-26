import { TestBed } from '@angular/core/testing';

import { GetCompanyDeptsService } from './get-company-depts.service';

describe('GetCompanyDeptsService', () => {
  let service: GetCompanyDeptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyDeptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
