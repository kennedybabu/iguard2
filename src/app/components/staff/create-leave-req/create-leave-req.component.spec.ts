import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeaveReqComponent } from './create-leave-req.component';

describe('CreateLeaveReqComponent', () => {
  let component: CreateLeaveReqComponent;
  let fixture: ComponentFixture<CreateLeaveReqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateLeaveReqComponent]
    });
    fixture = TestBed.createComponent(CreateLeaveReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
