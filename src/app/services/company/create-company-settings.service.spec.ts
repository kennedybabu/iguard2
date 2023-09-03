import { TestBed } from '@angular/core/testing';

import { CreateCompanySettingsService } from './create-company-settings.service';

describe('CreateCompanySettingsService', () => {
  let service: CreateCompanySettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompanySettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
