import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLeavesComponent } from './company-leaves.component';

describe('CompanyLeavesComponent', () => {
  let component: CompanyLeavesComponent;
  let fixture: ComponentFixture<CompanyLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyLeavesComponent]
    });
    fixture = TestBed.createComponent(CompanyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
