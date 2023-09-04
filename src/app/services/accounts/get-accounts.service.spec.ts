import { TestBed } from '@angular/core/testing';

import { GetAccountsService } from './get-accounts.service';

describe('GetAccountsService', () => {
  let service: GetAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
