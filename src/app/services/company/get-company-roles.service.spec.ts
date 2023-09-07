import { TestBed } from '@angular/core/testing';

import { GetCompanyRolesService } from './get-company-roles.service';

describe('GetCompanyRolesService', () => {
  let service: GetCompanyRolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyRolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
