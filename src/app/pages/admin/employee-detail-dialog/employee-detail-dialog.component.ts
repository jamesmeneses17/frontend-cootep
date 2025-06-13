import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-detail-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-detail-dialog.component.html',
  styleUrl: './employee-detail-dialog.component.css',
})
export class EmployeeDetailDialogComponent {
  mode: 'view' | 'edit';

  positions: any[] = [];
  contractTypes: any[] = [];
  roles: any[] = [];
  statuses: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<EmployeeDetailDialogComponent>,
    private employeeService: EmployeeService
  ) {
    this.mode = data.mode || 'view';
    this.loadDropdownData();
  }

  loadDropdownData() {
    this.employeeService.getPositions().subscribe(res => this.positions = res);
    this.employeeService.getContractTypes().subscribe(res => this.contractTypes = res);
    this.employeeService.getRoles().subscribe(res => this.roles = res);
    this.employeeService.getStatuses().subscribe(res => this.statuses = res);
  }

 onSubmit() {
  const employeePayload = {
    first_name: this.data.first_name,
    last_name: this.data.last_name,
    national_id: this.data.national_id,
    birth_date: this.data.birth_date,
    email: this.data.user.email,
    roleId: this.data.user.role.id,
    statusId: this.data.status.id,
  };

  const historyPayload = {
    salary: this.data.latestEmployment.salary,
    positionId: this.data.latestEmployment.position.id,
    contractTypeId: this.data.latestEmployment.contractType.id,
  };

  // Actualizar empleado
  this.employeeService.updateEmployee(this.data.id, employeePayload).subscribe({
    next: () => {
      // Actualizar historial
      this.employeeService.updateEmploymentHistory(
        this.data.latestEmployment.id,
        historyPayload
      ).subscribe({
        next: () => {
          alert('Empleado y historial actualizado con éxito');
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar historial:', err);
          alert('Error al guardar historial');
        }
      });
    },
    error: (err) => {
      console.error('Error al actualizar empleado:', err);
      alert('Error al guardar datos personales');
    }
  });
}



}
