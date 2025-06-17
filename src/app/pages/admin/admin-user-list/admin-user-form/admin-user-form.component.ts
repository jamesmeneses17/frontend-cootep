import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-user-form.component.html',
})
export class AdminUserFormComponent {
  cedula = '';
  empleadoEncontrado: any = null;

  @Output() onGuardar = new EventEmitter<{ employeeId: number; role: string }>();
  @Output() onCancelar = new EventEmitter<void>();

  private cedulaSubject = new Subject<string>();

  constructor(private http: HttpClient) {
    this.cedulaSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
        this.buscarEmpleado(value);
      });
  }

  onCedulaChange(value: string) {
    this.cedulaSubject.next(value);
  }

  buscarEmpleado(cedula: string) {
    if (!cedula) return;
    this.http
      .get<any>(`http://localhost:3000/users/by-cedula/${cedula}`)
      .subscribe({
        next: (data) => (this.empleadoEncontrado = data),
        error: () => (this.empleadoEncontrado = null),
      });
  }

  guardar() {
    if (this.empleadoEncontrado) {
      this.onGuardar.emit({
        employeeId: this.empleadoEncontrado.id,
        role: 'admin',
      });
    }
  }

  cancelar() {
    this.onCancelar.emit();
  }
}
