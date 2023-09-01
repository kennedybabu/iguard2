import { TestBed } from '@angular/core/testing';

import { CreateLeaveReqService } from './create-leave-req.service';

describe('CreateLeaveReqService', () => {
  let service: CreateLeaveReqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateLeaveReqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
