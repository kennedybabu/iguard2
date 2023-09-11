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
import { PremiseBeaconsComponent } from './components/premise/premise-beacons/premise-beacons.component';
import { AddPremiseBeaconsComponent } from './components/premise/add-premise-beacons/add-premise-beacons.component';
import { CreateCompanyComponent } from './components/company/create-company/create-company.component';
import { CreateCompanyDeptComponent } from './components/company/create-company-dept/create-company-dept.component';
import { AddShiftComponent } from './components/company/add-shift/add-shift.component';
import { CompanyShiftsComponent } from './components/company/company-shifts/company-shifts.component';
import { CreateStaffComponent } from './components/company/create-staff/create-staff.component';
import { FormsModule } from '@angular/forms';
import { StaffLoginComponent } from './pages/staff-login/staff-login.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { CreateAppointmentComponent } from './components/staff/create-appointment/create-appointment.component';
import { CreateLeaveReqComponent } from './components/staff/create-leave-req/create-leave-req.component';
import { CreateCompanySettingsComponent } from './components/company/create-company-settings/create-company-settings.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { PremiseLeaveReqsComponent } from './components/premise/premise-leave-reqs/premise-leave-reqs.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { CreateAccountComponent } from './components/accounts/create-account/create-account.component';
import { TruncatePipe } from './truncate.pipe';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UpdateCompanySettingsComponent } from './components/company/update-company-settings/update-company-settings.component';
import { CreateCompanyLeaveComponent } from './components/company/create-company-leave/create-company-leave.component';
import { CompanyLeavesComponent } from './components/company/company-leaves/company-leaves.component';
import { DepartmentComponent } from './pages/department/department.component';
import { CompanyDesignationsComponent } from './components/company/company-designations/company-designations.component';
import { CreateCompanyDesignationComponent } from './components/company/create-company-designation/create-company-designation.component';
import { ShiftDetailsComponent } from './pages/shift-details/shift-details.component';
import { PremiseAppointmentTagsComponent } from './components/premise/premise-appointment-tags/premise-appointment-tags.component';
import { CreatePremiseAppointmentTagComponent } from './components/premise/create-premise-appointment-tag/create-premise-appointment-tag.component';
import { UnassignedStaffComponent } from './components/company/unassigned-staff/unassigned-staff.component';
import { ShiftBreaksComponent } from './components/shift/shift-breaks/shift-breaks.component';
import { CreateShiftBreakComponent } from './components/shift/create-shift-break/create-shift-break.component';



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
    DateRangeComponent,
    PremiseBeaconsComponent,
    AddPremiseBeaconsComponent,
    CreateCompanyComponent,
    CreateCompanyDeptComponent,
    AddShiftComponent,
    CompanyShiftsComponent,
    CreateStaffComponent,
    StaffLoginComponent,
    CreateAppointmentComponent,
    CreateLeaveReqComponent,
    CreateCompanySettingsComponent,
    NotificationsComponent,
    PremiseLeaveReqsComponent,
    AccountsComponent,
    CreateAccountComponent,
    TruncatePipe,
    UpdateCompanySettingsComponent,
    CreateCompanyLeaveComponent,
    CompanyLeavesComponent,
    DepartmentComponent,
    CompanyDesignationsComponent,
    CreateCompanyDesignationComponent,
    ShiftDetailsComponent,
    PremiseAppointmentTagsComponent,
    CreatePremiseAppointmentTagComponent,
    UnassignedStaffComponent,
    ShiftBreaksComponent,
    CreateShiftBreakComponent,

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
    MatDialogModule,
    FormsModule,
    ScheduleModule, 
    NgApexchartsModule
    
  ],
  providers: [
    DatePipe,
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
