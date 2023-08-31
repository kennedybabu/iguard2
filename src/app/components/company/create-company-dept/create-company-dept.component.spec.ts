import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyDeptComponent } from './create-company-dept.component';

describe('CreateCompanyDeptComponent', () => {
  let component: CreateCompanyDeptComponent;
  let fixture: ComponentFixture<CreateCompanyDeptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyDeptComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
