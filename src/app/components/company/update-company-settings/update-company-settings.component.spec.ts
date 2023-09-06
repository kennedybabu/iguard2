import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCompanySettingsComponent } from './update-company-settings.component';

describe('UpdateCompanySettingsComponent', () => {
  let component: UpdateCompanySettingsComponent;
  let fixture: ComponentFixture<UpdateCompanySettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCompanySettingsComponent]
    });
    fixture = TestBed.createComponent(UpdateCompanySettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
