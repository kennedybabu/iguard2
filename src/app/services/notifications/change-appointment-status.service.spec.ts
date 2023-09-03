import { TestBed } from '@angular/core/testing';

import { ChangeAppointmentStatusService } from './change-appointment-status.service';

describe('ChangeAppointmentStatusService', () => {
  let service: ChangeAppointmentStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeAppointmentStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
