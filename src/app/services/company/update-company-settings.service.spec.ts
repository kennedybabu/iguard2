import { TestBed } from '@angular/core/testing';

import { UpdateCompanySettingsService } from './update-company-settings.service';

describe('UpdateCompanySettingsService', () => {
  let service: UpdateCompanySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCompanySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
