import { TestBed } from '@angular/core/testing';

import { GetCompanyBeaconsService } from './get-company-beacons.service';

describe('GetCompanyBeaconsService', () => {
  let service: GetCompanyBeaconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanyBeaconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
