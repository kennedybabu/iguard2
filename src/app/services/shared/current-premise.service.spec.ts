import { TestBed } from '@angular/core/testing';

import { CurrentPremiseService } from './current-premise.service';

describe('CurrentPremiseService', () => {
  let service: CurrentPremiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPremiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
