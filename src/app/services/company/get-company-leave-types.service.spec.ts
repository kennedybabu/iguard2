import { TestBed } from '@angular/core/testing';

import { GetCompanyLeaveTypesService } from './get-company-leave-types.service';

describe('GetCompanyLeaveTypesService', () => {
  let service: GetCompanyLeaveTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyLeaveTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
