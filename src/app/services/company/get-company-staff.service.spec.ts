import { TestBed } from '@angular/core/testing';

import { GetCompanyStaffService } from './get-company-staff.service';

describe('GetCompanyStaffService', () => {
  let service: GetCompanyStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
