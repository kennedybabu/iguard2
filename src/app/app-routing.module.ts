import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { CompaniesComponent } from './pages/companies/companies.component';
import { StaffComponent } from './pages/staff/staff.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { CompanyComponent } from './pages/company/company.component';
import { StaffProfileComponent } from './pages/staff-profile/staff-profile.component';
import { RoleBaseGuard  as RoleGuard } from './_guard/role-base.guard';
import { StaffLoginComponent } from './pages/staff-login/staff-login.component';
import { AuthGuard } from './auth.guard';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { AccountsComponent } from './pages/accounts/accounts.component';
import { DepartmentComponent } from './pages/department/department.component';
import { ShiftDetailsComponent } from './pages/shift-details/shift-details.component';



const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard, AuthGuard]
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'companies/:id', component: CompaniesComponent, canActivate: [AuthGuard, RoleGuard] },
  {
    path: 'staff', component: StaffComponent,  canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'departments', component: DepartmentsComponent,  canActivate: [AuthGuard, RoleGuard]
  },
  { path: 'company/:id', component: CompanyComponent,  canActivate: [AuthGuard, RoleGuard]},
  {path:'staff-login', component: StaffLoginComponent},
  {path:'staff-profile/:id', component: StaffProfileComponent,  canActivate: [AuthGuard]},
  {path:'notifications/:id',component: NotificationsComponent},
  {path: 'accounts',component: AccountsComponent},
  {path:'department/:id', component: DepartmentComponent},
  {path: 'shift-details/:id', component: ShiftDetailsComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
