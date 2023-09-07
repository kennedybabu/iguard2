import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDesignationsComponent } from './company-designations.component';

describe('CompanyDesignationsComponent', () => {
  let component: CompanyDesignationsComponent;
  let fixture: ComponentFixture<CompanyDesignationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDesignationsComponent]
    });
    fixture = TestBed.createComponent(CompanyDesignationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
