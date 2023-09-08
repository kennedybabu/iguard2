import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePremiseAppointmentTagComponent } from './create-premise-appointment-tag.component';

describe('CreatePremiseAppointmentTagComponent', () => {
  let component: CreatePremiseAppointmentTagComponent;
  let fixture: ComponentFixture<CreatePremiseAppointmentTagComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatePremiseAppointmentTagComponent]
    });
    fixture = TestBed.createComponent(CreatePremiseAppointmentTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
