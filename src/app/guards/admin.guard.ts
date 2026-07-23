import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('access_token');
    if (!token) return this.router.parseUrl('/login');

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = (payload.role || '').toLowerCase();
      const isSuperAdmin = payload.is_superadmin === true || payload.is_superadmin === 1;

      if (role === 'admin' || role === 'administrador' || isSuperAdmin) {
        return true;
      }
      return this.router.parseUrl('/empleado/perfil');
    } catch (e) {
      return this.router.parseUrl('/login');
    }
  }
}
