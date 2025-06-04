import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  showPassword = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('Usuario autenticado', response);
      },
      error: (err) => {
        console.error('Error al iniciar sesión', err);
      },
    });
  }
}
