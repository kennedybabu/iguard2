import { TestBed } from '@angular/core/testing';

import { GetPremiseDetailsService } from './get-premise-details.service';

describe('GetPremiseDetailsService', () => {
  let service: GetPremiseDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
