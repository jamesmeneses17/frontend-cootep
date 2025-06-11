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

        // ✅ Guarda tokens
        localStorage.setItem('access_token', data.access_token);
        if (data.user_id) {
          localStorage.setItem('user_id', data.user_id);
        }

        // 🔁 Redirige al perfil
        this.router.navigate(['/empleado/perfil']);
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      },
    });
  }
}
