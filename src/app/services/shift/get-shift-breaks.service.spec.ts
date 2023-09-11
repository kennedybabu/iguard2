import { TestBed } from '@angular/core/testing';

import { GetShiftBreaksService } from './get-shift-breaks.service';

describe('GetShiftBreaksService', () => {
  let service: GetShiftBreaksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetShiftBreaksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
