import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminUserFormComponent } from './admin-user-form/admin-user-form.component';

@Component({
  selector: 'app-admin-user-list',
  standalone: true,
  imports: [CommonModule, AdminUserFormComponent],
  templateUrl: './admin-user-list.component.html',
  styleUrl: './admin-user-list.component.css',
})
export class AdminUserListComponent implements OnInit {
  adminUsers: any[] = [];
  profile: any;
  mostrarFormulario = false;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadProfile();
    this.loadAdminUsers();
  }

  loadProfile(): void {
    this.http.get('https://backend-cootep.onrender.com/auth/profile').subscribe({
      next: (data) => {
        console.log('Perfil cargado:', data);
        this.profile = data;
      },
      error: (err) => console.error('Error cargando el perfil', err),
    });
  }

  get isSuperAdmin(): boolean {
    return this.profile?.is_superadmin === true || this.profile?.is_superadmin === 1;
  }

  loadAdminUsers(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/users/admins').subscribe({
      next: (data) =>
        this.adminUsers = data.map((user) => ({
          ...user,
          fullName: user.employee?.first_name + ' ' + user.employee?.last_name,
          lastLogin: user.last_login,
        })),
      error: (err) => console.error('Error cargando usuarios admin', err),
    });
  }

  onEdit(user: any): void {
    this.router.navigate(['/admin/admin-user-edit', user.id]);
  }

  // 🔁 Actualizado: ahora solo cambia el rol a "empleado" (no elimina el usuario)
  onDelete(user: any): void {
    const confirmDowngrade = confirm(
      `¿Está seguro de quitar el rol de administrador a ${user.fullName}?`
    );
    if (confirmDowngrade) {
      this.http.patch(`https://backend-cootep.onrender.com/users/${user.id}/downgrade`, {}).subscribe({
        next: () => this.loadAdminUsers(),
        error: (err) => console.error('Error cambiando rol del usuario', err),
      });
    }
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardarNuevoAdmin(data: { employeeId: number; role: string }): void {
    const roleId = 1; // admin
    this.http.patch(`https://backend-cootep.onrender.com/users/${data.employeeId}/role`, {
      role_id: roleId,
    }).subscribe({
      next: () => {
        this.loadAdminUsers();
        this.mostrarFormulario = false;
      },
      error: (err) => console.error('Error actualizando rol:', err),
    });
  }
}
