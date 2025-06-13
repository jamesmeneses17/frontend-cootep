import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { Employee, EmploymentHistory } from '../../../interfaces/employee.interface';


@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error al obtener empleados:', err);
      }
    });
  }

  getLatestEmployment(employee: Employee): EmploymentHistory | null {
    if (!employee.employment_history || employee.employment_history.length === 0) {
      return null;
    }

    return employee.employment_history
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())[0];
  }

}
