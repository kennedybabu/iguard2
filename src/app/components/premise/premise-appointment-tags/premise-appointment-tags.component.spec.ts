import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseAppointmentTagsComponent } from './premise-appointment-tags.component';

describe('PremiseAppointmentTagsComponent', () => {
  let component: PremiseAppointmentTagsComponent;
  let fixture: ComponentFixture<PremiseAppointmentTagsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiseAppointmentTagsComponent]
    });
    fixture = TestBed.createComponent(PremiseAppointmentTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
