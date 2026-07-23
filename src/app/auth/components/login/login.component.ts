import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        const data = response as { access_token: string; user_id?: string };
        console.log('Usuario autenticado', data);

        localStorage.setItem('access_token', data.access_token);
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id);
        }

        // Decodificar el token para extraer el rol
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        const role = (payload.role || '').toLowerCase();
        const isSuperAdmin = payload.is_superadmin === true || payload.is_superadmin === 1;

        console.log('Login exitoso. Rol detectado:', role, 'isSuperAdmin:', isSuperAdmin);

        // Redirigir según el rol
        if (role === 'admin' || role === 'administrador' || isSuperAdmin) {
          this.router.navigate(['/admin']);
        } else if (role === 'empleado' || role === 'employee') {
          this.router.navigate(['/empleado/perfil']);
        } else {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      },
    });
  }
}
