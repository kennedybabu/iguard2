import { TestBed } from '@angular/core/testing';

import { GetCompanyShiftsService } from './get-company-shifts.service';

describe('GetCompanyShiftsService', () => {
  let service: GetCompanyShiftsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyShiftsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
