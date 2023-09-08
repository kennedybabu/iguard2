import { TestBed } from '@angular/core/testing';

import { CreatePremiseAppointmentTagService } from './create-premise-appointment-tag.service';

describe('CreatePremiseAppointmentTagService', () => {
  let service: CreatePremiseAppointmentTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePremiseAppointmentTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
