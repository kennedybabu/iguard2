import { TestBed } from '@angular/core/testing';

import { CreateCompanyLeaveService } from './create-company-leave.service';

describe('CreateCompanyLeaveService', () => {
  let service: CreateCompanyLeaveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanyLeaveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
