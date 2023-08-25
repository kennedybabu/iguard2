import { TestBed } from '@angular/core/testing';

import { GetAllPremisesService } from './get-all-premises.service';

describe('GetAllPremisesService', () => {
  let service: GetAllPremisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllPremisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
