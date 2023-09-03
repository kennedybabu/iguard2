import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseLeaveReqsComponent } from './premise-leave-reqs.component';

describe('PremiseLeaveReqsComponent', () => {
  let component: PremiseLeaveReqsComponent;
  let fixture: ComponentFixture<PremiseLeaveReqsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiseLeaveReqsComponent]
    });
    fixture = TestBed.createComponent(PremiseLeaveReqsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
