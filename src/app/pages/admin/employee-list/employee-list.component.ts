import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../services/employee.service';
import { Employee, EmploymentHistory } from '../../../interfaces/employee.interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeDetailDialogComponent } from '../employee-detail-dialog/employee-detail-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, MatDialogModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  // Filtros
  searchTerm = '';
  selectedStatus = 'all';
  dateStart: string = '';
  dateEnd: string = '';
  startDateOptions: string[] = [];

  // Paginación
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  totalItems = 0;

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadEmployees();

    this.employeeService.getHistoryDateRange().subscribe({
      next: (data) => {
        this.startDateOptions = data.startDates;
      },
      error: (err) => console.error('Error al obtener fechas:', err),
    });
  }

  // Obtener historial más reciente
  getLatestEmployment(employee: Employee): EmploymentHistory | null {
    if (!employee.employment_history || employee.employment_history.length === 0) {
      return null;
    }
    return employee.employment_history.sort(
      (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    )[0];
  }

  // Paginación
  loadEmployees() {
    this.employeeService.getEmployees(this.currentPage, this.pageSize).subscribe({
      next: (res) => {
        this.employees = res.data;
        this.totalPages = res.totalPages;
        this.totalItems = res.total;
      },
      error: (err) => console.error('Error al obtener empleados:', err),
    });
  }

  onPageSizeChange() {
    this.currentPage = 1;
    this.loadEmployees();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  onMatPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.loadEmployees();
  }

  // Abrir modal en modo View o Edit
  openEmployeeDialog(id: number, mode: 'view' | 'edit' = 'view') {
    this.employeeService.getEmployeeDetails(id).subscribe({
      next: (data) => {
        const dialogRef = this.dialog.open(EmployeeDetailDialogComponent, {
          width: '600px',
          data: {
            ...data,
            mode, // ← aquí pasamos el modo al diálogo
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result){
            this.loadEmployees();
          }
        });
      },
      error: (err) => console.error('Error al obtener detalles del empleado:', err),
    });
  }




  // Filtros en frontend (opcional si más adelante lo haces por backend)
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
