import { TestBed } from '@angular/core/testing';

import { CreateCompanyStaffService } from './create-company-staff.service';

describe('CreateCompanyStaffService', () => {
  let service: CreateCompanyStaffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanyStaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
