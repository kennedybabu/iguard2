import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStaffComponent } from './company-staff.component';

describe('CompanyStaffComponent', () => {
  let component: CompanyStaffComponent;
  let fixture: ComponentFixture<CompanyStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyStaffComponent]
    });
    fixture = TestBed.createComponent(CompanyStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
