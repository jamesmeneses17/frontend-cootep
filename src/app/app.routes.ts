import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/components/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'empleado/perfil',
    loadComponent: () =>
      import('./pages/employee/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/cambiar-contrasena',
    loadComponent: () => import('./pages/employee/change-password/change-password.component').then(m => m.ChangePasswordComponent)
  }



];
