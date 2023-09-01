import { TestBed } from '@angular/core/testing';

import { GetPremiseCompaniesService } from './get-premise-companies.service';

describe('GetPremiseCompaniesService', () => {
  let service: GetPremiseCompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseCompaniesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
