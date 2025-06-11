import { HttpInterceptorFn } from '@angular/common/http';

//adjuntar el token en cada peticion http - rutas protegidas

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  // condicion para que angular no utilice localstorage alado del server
  if (typeof window === 'undefined') return next(req);
  const token = localStorage.getItem('access_token');
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq);
  }
  return next(req);
};
