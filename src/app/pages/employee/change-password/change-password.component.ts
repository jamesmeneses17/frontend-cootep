import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { EmployeeService } from '../../../services/employee.service';



@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit {
  profile: any = null;
  sidebarOpen = false;

  formData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  constructor(private http: HttpClient, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getProfile().subscribe({
      next: (data) => {
        console.log('Perfil cargado en cambiar contraseña:', data);
        this.profile = data;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      }
    });
  }


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

onSubmit() {
  if (this.formData.newPassword !== this.formData.confirmPassword) {
    alert('Las contraseñas no coinciden');
    return;
  }

  this.http.post('http://localhost:3000/auth/change-password', {
    currentPassword: this.formData.currentPassword,
    newPassword: this.formData.newPassword,
  })
  .subscribe({
    next: () => {
      alert('Contraseña cambiada con éxito');
      this.router.navigate(['/empleado/informacion-personal']);
    },
    error: (err) => {
      console.error('Error al cambiar contraseña', err);
      alert('Error al cambiar contraseña');
    }
  });
}


}
