import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCompanySettingsComponent } from './create-company-settings.component';

describe('CreateCompanySettingsComponent', () => {
  let component: CreateCompanySettingsComponent;
  let fixture: ComponentFixture<CreateCompanySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCompanySettingsComponent]
    });
    fixture = TestBed.createComponent(CreateCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
