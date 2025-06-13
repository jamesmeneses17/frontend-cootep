import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employment-history',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './employment-history.component.html'
})
export class EmploymentHistoryComponent implements OnInit {
  profile: any = null;
  sidebarOpen = false;

  history: any[] = [];
  loading = true;
  error = '';

  filterStartDate = '';
  filterEndDate = '';

  startDateOptions: string[] = [];
  endDateOptions: string[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadAllEmploymentHistory();
    this.loadDateRange();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  loadProfile() {
    this.employeeService.getProfile().subscribe({
      next: (data) => {
        this.profile = data;
      },
      error: (err) => {
        console.error('Error cargando perfil:', err);
      },
    });
  }

  loadAllEmploymentHistory() {
    this.employeeService.getAllEmploymentHistory().subscribe({
      next: (data) => {
        this.history = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar historial completo.';
        this.loading = false;
        console.error(err);
      },
    });
  }

  loadDateRange() {
    this.employeeService.getHistoryDateRange().subscribe({
      next: (range) => {
        this.startDateOptions = range.startDates || [];
        this.endDateOptions = range.endDates || [];
      },
      error: (err) => {
        console.error('Error cargando rangos de fechas:', err);
      },
    });
  }

  get filteredHistory() {
    return this.history.filter(item => {
      const start = this.filterStartDate ? new Date(this.filterStartDate) : null;
      const end = this.filterEndDate ? new Date(this.filterEndDate) : null;

      const itemStart = new Date(item.startDate);
      const itemEnd = item.endDate ? new Date(item.endDate) : new Date();

      return (!start || itemEnd >= start) && (!end || itemStart <= end);
    });
  }
}
