import { TestBed } from '@angular/core/testing';

import { ChangeLeaveReqsStatusService } from './change-leave-reqs-status.service';

describe('ChangeLeaveReqsStatusService', () => {
  let service: ChangeLeaveReqsStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeLeaveReqsStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
