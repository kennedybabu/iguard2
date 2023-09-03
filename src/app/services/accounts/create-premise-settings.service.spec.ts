import { TestBed } from '@angular/core/testing';

import { CreatePremiseSettingsService } from './create-premise-settings.service';

describe('CreatePremiseSettingsService', () => {
  let service: CreatePremiseSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePremiseSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
