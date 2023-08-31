import { TestBed } from '@angular/core/testing';

import { ValidateOtpService } from './validate-otp.service';

describe('ValidateOtpService', () => {
  let service: ValidateOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
