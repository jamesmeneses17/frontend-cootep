import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employment-history',
  templateUrl: './employment-history.component.html',
  standalone: true,
    imports: [CommonModule],

})
export class EmploymentHistoryComponent implements OnInit {
  history: any[] = [];
  loading = true;
  error = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmploymentHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar historial.';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
