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

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role === 'admin' || this.router.parseUrl('/empleado');
  }
}
