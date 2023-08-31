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

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [RoleGuard]
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'companies/:id', component: CompaniesComponent },
  {
    path: 'staff', component: StaffComponent
  },
  {
    path: 'departments', component: DepartmentsComponent
  },
  { path: 'company/:id', component: CompanyComponent},
  {path:'staff-login', component: StaffLoginComponent},
  {path:'staff-profile/:id', component: StaffProfileComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
