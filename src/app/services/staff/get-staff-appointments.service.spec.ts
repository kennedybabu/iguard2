import { TestBed } from '@angular/core/testing';

import { GetStaffAppointmentsService } from './get-staff-appointments.service';

describe('GetStaffAppointmentsService', () => {
  let service: GetStaffAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStaffAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
