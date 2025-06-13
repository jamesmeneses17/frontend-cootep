import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee, EmploymentHistory } from '../../../interfaces/employee.interface';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchTerm = '';
  selectedStatus = 'all';
  dateStart: string = '';
  dateEnd: string = '';

  startDateOptions: string[] = []; // ← paso 3

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    // Obtener empleados
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error al obtener empleados:', err),
    });

    // Obtener fechas disponibles (paso 3)
    this.employeeService.getHistoryDateRange().subscribe({
      next: (data) => {
        this.startDateOptions = data.startDates;
      },
      error: (err) => console.error('Error al obtener fechas:', err),
    });
  }

  getLatestEmployment(employee: Employee): EmploymentHistory | null {
    if (!employee.employment_history || employee.employment_history.length === 0) {
      return null;
    }
    return employee.employment_history.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )[0];
  }

  get filteredEmployees() {
    return this.employees.filter(emp => {
      const fullText = `${emp.first_name} ${emp.last_name} ${emp.national_id} ${emp.user.email}`.toLowerCase();
      const matchesSearch = fullText.includes(this.searchTerm.toLowerCase());
      const matchesStatus = this.selectedStatus === 'all' || emp.status.name === this.selectedStatus;

      const ingreso = new Date(this.getLatestEmployment(emp)?.startDate || '');
      const matchesDate =
        (!this.dateStart || ingreso >= new Date(this.dateStart)) &&
        (!this.dateEnd || ingreso <= new Date(this.dateEnd));

      return matchesSearch && matchesStatus && matchesDate;
    });
  }
}
