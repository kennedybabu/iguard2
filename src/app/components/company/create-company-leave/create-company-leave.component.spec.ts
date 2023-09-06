import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyLeaveComponent } from './create-company-leave.component';

describe('CreateCompanyLeaveComponent', () => {
  let component: CreateCompanyLeaveComponent;
  let fixture: ComponentFixture<CreateCompanyLeaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyLeaveComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
