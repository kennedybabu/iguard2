import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftBreaksComponent } from './shift-breaks.component';

describe('ShiftBreaksComponent', () => {
  let component: ShiftBreaksComponent;
  let fixture: ComponentFixture<ShiftBreaksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShiftBreaksComponent]
    });
    fixture = TestBed.createComponent(ShiftBreaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
