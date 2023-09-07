import { TestBed } from '@angular/core/testing';

import { CreateCompanyRoleService } from './create-company-role.service';

describe('CreateCompanyRoleService', () => {
  let service: CreateCompanyRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanyRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
