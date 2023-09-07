import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanyDesignationComponent } from './create-company-designation.component';

describe('CreateCompanyDesignationComponent', () => {
  let component: CreateCompanyDesignationComponent;
  let fixture: ComponentFixture<CreateCompanyDesignationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanyDesignationComponent]
    });
    fixture = TestBed.createComponent(CreateCompanyDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
