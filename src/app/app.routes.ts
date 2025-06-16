import { Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

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

  // Panel del Empleado
  {
    path: 'empleado/perfil',
    loadComponent: () =>
      import('./pages/employee/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/solicitar-certificado',
    loadComponent: () =>
      import('./pages/employee/certificate-history/certificate-history.component').then(m => m.CertificateHistoryComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/historial-laboral',
    loadComponent: () =>
      import('./pages/employee/employment-history/employment-history.component').then(m => m.EmploymentHistoryComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/historial-certificados',
    loadComponent: () =>
      import('./pages/employee/certificate-history/certificate-history.component').then(m => m.CertificateHistoryComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/ayuda',
    loadComponent: () =>
      import('./pages/employee/help/help.component').then(m => m.HelpComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'empleado/cambiar-contrasena',
    loadComponent: () =>
      import('./pages/employee/change-password/change-password.component').then(m => m.ChangePasswordComponent),
    canActivate: [AuthGuard],
  },

  //  Panel del Administrador
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path: 'employees',
        loadComponent: () =>
          import('./pages/admin/employee-list/employee-list.component').then(m => m.EmployeeListComponent),
      },
      {
        path: 'employees/edit/:id',
        loadComponent: () =>
          import('./pages/admin/employee-edit/employee-edit.component').then(m => m.EmployeeEditComponent),
      },
      {
        path: 'employees/view/:id',
        loadComponent: () =>
          import('./pages/admin/employee-view/employee-view.component').then(m => m.EmployeeViewComponent),
      },
      {
        path: 'employment-history',
        loadComponent: () =>
          import('./pages/admin/employment-history/employment-history.component').then(m => m.EmploymentHistoryComponent),
      },
      {
        path: 'positions-functions',
        loadComponent: () =>
          import('./pages/admin/positions-functions/positions-functions.component').then(m => m.PositionsFunctionsComponent),
      },
      {
      path: 'statistics',
        loadComponent: () =>
          import('./pages/admin/statistics/statistics.component').then(m => m.StatisticsComponent),
        canActivate: [AdminGuard],
      },

      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      }
    ]
  }
];
