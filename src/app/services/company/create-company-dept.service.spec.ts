import { TestBed } from '@angular/core/testing';

import { CreateCompanyDeptService } from './create-company-dept.service';

describe('CreateCompanyDeptService', () => {
  let service: CreateCompanyDeptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanyDeptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
