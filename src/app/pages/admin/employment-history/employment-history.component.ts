// ✅ TS actualizado y funcional con paginador y filtros
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { EmploymentHistoryCreateDialogComponent } from '../employment-history-create-dialog/employment-history-create-dialog.component';
import { EmploymentHistoryViewComponent } from '../employment-history-view/employment-history-view.component';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employment-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    EmploymentHistoryCreateDialogComponent,
    EmploymentHistoryViewComponent,
    EditDialogComponent,
    MatPaginatorModule
  ],
  templateUrl: './employment-history.component.html',
  styleUrls: ['./employment-history.component.css']
})
export class EmploymentHistoryComponent implements OnInit {
  histories: any[] = [];
  filteredHistories: any[] = [];
  paginatedHistories: any[] = [];
  showCreateForm = false;
  selectedHistory: any = null;
  editing = false;

  positions: any[] = [];
  contracts: any[] = [];

  // Filtros
  filters = {
    nationalId: '',
    positionId: '',
    contractTypeId: ''
  };

  // Paginador
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadHistories();
    this.loadPositions();
    this.loadContracts();
  }

  loadHistories(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/employment-history/admin/all').subscribe({
      next: data => {
        this.histories = data;
        this.applyFilters();
      },
      error: err => console.error('Error al cargar historiales', err)
    });
  }

  loadPositions(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/positions').subscribe({
      next: data => this.positions = data,
      error: err => console.error('Error al cargar cargos', err)
    });
  }

  loadContracts(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/contract-type').subscribe({
      next: data => this.contracts = data,
      error: err => console.error('Error al cargar contratos', err)
    });
  }

  applyFilters(): void {
    this.currentPage = 0;
    this.filteredHistories = this.histories.filter(h => {
      const matchId = this.filters.nationalId === '' || h.employee?.national_id?.includes(this.filters.nationalId);
      const matchPosition = this.filters.positionId === '' || h.position?.id == this.filters.positionId;
      const matchContract = this.filters.contractTypeId === '' || h.contractType?.id == this.filters.contractTypeId;
      return matchId && matchPosition && matchContract;
    });
    this.updatePaginatedData();
  }

  updatePaginatedData(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedHistories = this.filteredHistories.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePaginatedData();
  }

  viewHistory(history: any): void {
    this.selectedHistory = history;
    this.editing = false;
  }

  editHistory(history: any): void {
    this.selectedHistory = history;
    this.editing = true;
  }

  closeModal = (): void => {
    this.selectedHistory = null;
    this.editing = false;
  };

  handleUpdate(): void {
    this.editing = false;
    this.selectedHistory = null;
    this.loadHistories();
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const meses = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const date = new Date(dateString);
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
    const anio = date.getFullYear();

    return `${dia} de ${mes} de ${anio}`;
  }

  deleteHistory(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este historial laboral?')) {
      this.http.delete(`https://backend-cootep.onrender.com/employment-history/${id}`).subscribe({
        next: () => {
          // Remueve localmente el historial eliminado y actualiza los filtros y paginación
          this.histories = this.histories.filter(h => h.id !== id);
          this.applyFilters();
        },
        error: err => console.error('Error al eliminar historial', err)
      });
    }
  }
  handleCreated(): void {
    this.showCreateForm = false;
    this.loadHistories();
  }


}
