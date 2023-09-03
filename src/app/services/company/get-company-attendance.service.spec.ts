import { TestBed } from '@angular/core/testing';

import { GetCompanyAttendanceService } from './get-company-attendance.service';

describe('GetCompanyAttendanceService', () => {
  let service: GetCompanyAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
