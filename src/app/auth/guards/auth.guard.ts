import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);

  // ✅ Asegúrate de que estás en el navegador
  if (typeof window === 'undefined') {
    return false;
  }

  const token = localStorage.getItem('access_token');
  if (!token) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
