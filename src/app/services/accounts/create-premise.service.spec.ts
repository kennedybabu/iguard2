import { TestBed } from '@angular/core/testing';

import { CreatePremiseService } from './create-premise.service';

describe('CreatePremiseService', () => {
  let service: CreatePremiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePremiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
