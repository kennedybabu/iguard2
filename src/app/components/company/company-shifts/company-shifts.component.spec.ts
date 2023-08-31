import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyShiftsComponent } from './company-shifts.component';

describe('CompanyShiftsComponent', () => {
  let component: CompanyShiftsComponent;
  let fixture: ComponentFixture<CompanyShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyShiftsComponent]
    });
    fixture = TestBed.createComponent(CompanyShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
