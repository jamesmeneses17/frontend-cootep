import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
        const role = payload.role;

        // Redirigir según el rol
        if (role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (role === 'empleado') {
          this.router.navigate(['/empleado/perfil']);
        } else {
          // fallback si no coincide con ningún rol conocido
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      },
    });
  }
}
