import { TestBed } from '@angular/core/testing';

import { GetStaffDetailsService } from './get-staff-details.service';

describe('GetStaffDetailsService', () => {
  let service: GetStaffDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStaffDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
