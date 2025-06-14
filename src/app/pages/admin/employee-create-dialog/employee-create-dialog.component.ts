import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-create-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-create-dialog.component.html',
  styleUrls: ['./employee-create-dialog.component.css']
})
export class EmployeeCreateDialogComponent implements OnInit {
  newEmployee = {
    first_name: '',
    last_name: '',
    national_id: '',
    email: '',
    birth_date: '',
    statusId: null
  };

  statuses: any[] = [];

  constructor(
    private employeeService: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeCreateDialogComponent>
  ) { }


  ngOnInit(): void {
    this.employeeService.getStatuses().subscribe({
      next: (res) => (this.statuses = res),
      error: (err) => console.error('Error al cargar estados:', err),
    });
  }



  createEmployee() {
    this.employeeService.createFullEmployee(this.newEmployee).subscribe({
      next: () => {
        alert('Empleado creado con éxito');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        alert('Error al crear empleado');
      }
    });
  }


  cancel() {
    this.dialogRef.close(false); // <- cancelación sin guardar
  }
}
