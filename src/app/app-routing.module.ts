import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path:'', redirectTo: '/dashboard', pathMatch: 'full'},
  {
    path: 'dashboard', component: DashboardComponent
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'auth', 
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
