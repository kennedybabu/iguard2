import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiseBeaconsComponent } from './premise-beacons.component';

describe('PremiseBeaconsComponent', () => {
  let component: PremiseBeaconsComponent;
  let fixture: ComponentFixture<PremiseBeaconsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PremiseBeaconsComponent]
    });
    fixture = TestBed.createComponent(PremiseBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
