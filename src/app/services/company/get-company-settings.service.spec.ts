import { TestBed } from '@angular/core/testing';

import { GetCompanySettingsService } from './get-company-settings.service';

describe('GetCompanySettingsService', () => {
  let service: GetCompanySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCompanySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
