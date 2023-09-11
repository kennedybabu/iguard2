import { TestBed } from '@angular/core/testing';

import { CreateShiftBreakService } from './create-shift-break.service';

describe('CreateShiftBreakService', () => {
  let service: CreateShiftBreakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateShiftBreakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
