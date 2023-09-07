import { TestBed } from '@angular/core/testing';

import { GetDepartmentDesignationsService } from './get-department-designations.service';

describe('GetDepartmentDesignationsService', () => {
  let service: GetDepartmentDesignationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDepartmentDesignationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
