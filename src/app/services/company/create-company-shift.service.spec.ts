import { TestBed } from '@angular/core/testing';

import { CreateCompanyShiftService } from './create-company-shift.service';

describe('CreateCompanyShiftService', () => {
  let service: CreateCompanyShiftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanyShiftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
