import { TestBed } from '@angular/core/testing';

import { CreatePremiseAdminService } from './create-premise-admin.service';

describe('CreatePremiseAdminService', () => {
  let service: CreatePremiseAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePremiseAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
