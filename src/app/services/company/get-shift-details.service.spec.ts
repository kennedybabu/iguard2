import { TestBed } from '@angular/core/testing';

import { GetShiftDetailsService } from './get-shift-details.service';

describe('GetShiftDetailsService', () => {
  let service: GetShiftDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShiftDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
