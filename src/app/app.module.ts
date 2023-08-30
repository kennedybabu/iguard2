import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import { CompaniesComponent } from './pages/companies/companies.component';
import { StaffComponent } from './pages/staff/staff.component';
import { AuthInterceptor } from './auth.interceptor';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { DatePipe } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { MatSortModule} from '@angular/material/sort';
import { CompanyComponent } from './pages/company/company.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CompanyStaffComponent } from './components/company/company-staff/company-staff.component';
import { StaffProfileComponent } from './pages/staff-profile/staff-profile.component';
import { DateRangeComponent } from './components/shared/date-range/date-range.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CompaniesComponent,
    StaffComponent,
    DepartmentsComponent,
    FooterComponent,
    CompanyComponent,
    CompanyStaffComponent,
    StaffProfileComponent,
    DateRangeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatListModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatStepperModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatSortModule,
    MatTabsModule,
    MatDialogModule
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
