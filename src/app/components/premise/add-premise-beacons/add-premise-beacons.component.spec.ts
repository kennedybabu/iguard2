import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPremiseBeaconsComponent } from './add-premise-beacons.component';

describe('AddPremiseBeaconsComponent', () => {
  let component: AddPremiseBeaconsComponent;
  let fixture: ComponentFixture<AddPremiseBeaconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPremiseBeaconsComponent]
    });
    fixture = TestBed.createComponent(AddPremiseBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
