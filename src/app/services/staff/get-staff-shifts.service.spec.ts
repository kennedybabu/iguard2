import { TestBed } from '@angular/core/testing';

import { GetStaffShiftsService } from './get-staff-shifts.service';

describe('GetStaffShiftsService', () => {
  let service: GetStaffShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStaffShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
