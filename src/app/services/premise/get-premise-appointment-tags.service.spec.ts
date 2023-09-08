import { TestBed } from '@angular/core/testing';

import { GetPremiseAppointmentTagsService } from './get-premise-appointment-tags.service';

describe('GetPremiseAppointmentTagsService', () => {
  let service: GetPremiseAppointmentTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseAppointmentTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
