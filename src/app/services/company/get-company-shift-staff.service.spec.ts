import { TestBed } from '@angular/core/testing';

import { GetCompanyShiftStaffService } from './get-company-shift-staff.service';

describe('GetCompanyShiftStaffService', () => {
  let service: GetCompanyShiftStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyShiftStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
