import { TestBed } from '@angular/core/testing';

import { GetPremiseAppointmentsService } from './get-premise-appointments.service';

describe('GetPremiseAppointmentsService', () => {
  let service: GetPremiseAppointmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseAppointmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
