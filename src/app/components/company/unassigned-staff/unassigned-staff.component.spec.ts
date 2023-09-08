import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnassignedStaffComponent } from './unassigned-staff.component';

describe('UnassignedStaffComponent', () => {
  let component: UnassignedStaffComponent;
  let fixture: ComponentFixture<UnassignedStaffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnassignedStaffComponent]
    });
    fixture = TestBed.createComponent(UnassignedStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
