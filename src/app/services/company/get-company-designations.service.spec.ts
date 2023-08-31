import { TestBed } from '@angular/core/testing';

import { GetCompanyDesignationsService } from './get-company-designations.service';

describe('GetCompanyDesignationsService', () => {
  let service: GetCompanyDesignationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyDesignationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
