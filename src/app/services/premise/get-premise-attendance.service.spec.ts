import { TestBed } from '@angular/core/testing';

import { GetPremiseAttendanceService } from './get-premise-attendance.service';

describe('GetPremiseAttendanceService', () => {
  let service: GetPremiseAttendanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseAttendanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
