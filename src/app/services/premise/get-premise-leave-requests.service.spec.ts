import { TestBed } from '@angular/core/testing';

import { GetPremiseLeaveRequestsService } from './get-premise-leave-requests.service';

describe('GetPremiseLeaveRequestsService', () => {
  let service: GetPremiseLeaveRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPremiseLeaveRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
