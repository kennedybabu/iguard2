import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShiftBreakComponent } from './create-shift-break.component';

describe('CreateShiftBreakComponent', () => {
  let component: CreateShiftBreakComponent;
  let fixture: ComponentFixture<CreateShiftBreakComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateShiftBreakComponent]
    });
    fixture = TestBed.createComponent(CreateShiftBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
