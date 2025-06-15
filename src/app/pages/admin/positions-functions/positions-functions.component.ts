import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { PositionFormComponent } from './position-form/position-form.component';
import { FunctionFormComponent } from './function-form/function-form.component';

@Component({
  selector: 'app-positions-functions',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, PositionFormComponent, FunctionFormComponent],
  templateUrl: './positions-functions.component.html',
})
export class PositionsFunctionsComponent implements OnInit {
  // Tabs
  private _activeTab: 'positions' | 'functions' = 'positions';

  get activeTab(): 'positions' | 'functions' {
    return this._activeTab;
  }

  set activeTab(tab: 'positions' | 'functions') {
    this._activeTab = tab;
    if (tab === 'functions') {
      this.loadFunctions();
    }
  }

  // Cargos
  positions: any[] = [];
  paginatedPositions: any[] = [];
  showCreateForm = false;
  selectedPosition: any = { title: '', description: '' };
  editing = false;

  // Funciones
  functions: any[] = [];
  showCreateFunctionForm = false;
  selectedFunction: any = { description: '', positionId: null };
  editingFunction = false;
  selectedPositionFilter: number | null = null;


  // Filtros
  filter = '';

  // Paginador
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15];

  functionPageSize = 5;
  functionPageOptions = [5, 10, 15];
  functionPageIndex = 0;
  paginatedFunctions: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadPositions();
    this.loadFunctions();
  }

  // ----------------------------------------
  // CRUD DE CARGOS
  // ----------------------------------------
  loadPositions(): void {
    this.http.get<any[]>('http://localhost:3000/positions').subscribe({
      next: data => {
        this.positions = data.map(pos => ({
          ...pos,
          id: Number(pos.id),
        }));
        this.applyFilter();
      },
      error: err => console.error('Error al cargar cargos', err),
    });
  }


  applyFilter(): void {
    const filtered = this.positions.filter(p =>
      p.title.toLowerCase().includes(this.filter.toLowerCase())
    );
    this.updatePaginatedData(filtered);
  }

  updatePaginatedData(list: any[]): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedPositions = list.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.applyFilter();
  }

  openCreateModal() {
    this.selectedPosition = { title: '', description: '' };
    this.editing = false;
    this.showCreateForm = true;
  }

  editPosition(position: any) {
    this.selectedPosition = { ...position };
    this.editing = true;
    this.showCreateForm = true;
  }

  savePosition(data: any) {
    if (this.editing) {
      this.http.patch(`http://localhost:3000/positions/${data.id}`, data).subscribe({
        next: () => this.handleUpdated(),
        error: err => {
          console.error('Error al editar cargo:', err);
          alert('No se pudo editar el cargo');
        },
      });
    } else {
      this.http.post('http://localhost:3000/positions', data).subscribe({
        next: () => this.handleCreated(),
        error: err => {
          console.error('Error al guardar el cargo:', err);
          alert('No se pudo guardar el cargo');
        },
      });
    }
  }

  deletePosition(id: number): void {
    if (!confirm('¿Estás seguro de eliminar este cargo?')) return;

    this.http.delete(`http://localhost:3000/positions/${id}`).subscribe({
      next: () => {
        this.loadPositions();
      },
      error: err => {
        console.error('Error al eliminar cargo:', err);
        alert('Hubo un problema al eliminar.');
      },
    });
  }

  // ----------------------------------------
  // FUNCIONES
  // ----------------------------------------

  loadFunctions(): void {
    this.http.get<any[]>('http://localhost:3000/functions').subscribe({
      next: data => {
        this.functions = data;
        this.updatePaginatedFunctions();
      },
      error: err => console.error('Error al cargar funciones', err),
    });
  }


  saveFunction(data: any): void {
    if (this.editingFunction && data.id) {
      // Modo edición
      this.http.patch(`http://localhost:3000/functions/${data.id}`, data).subscribe({
        next: () => {
          this.loadFunctions(); // Recarga funciones paginadas
          this.closeModal();
        },
        error: err => {
          console.error('Error al editar función:', err);
          alert('No se pudo editar la función');
        },
      });
    } else {
      // Modo creación
      this.http.post('http://localhost:3000/functions', data).subscribe({
        next: () => {
          this.loadFunctions();
          this.closeModal();
        },
        error: err => {
          console.error('Error al guardar función:', err);
          alert('No se pudo guardar la función');
        },
      });
    }
  }


  deleteFunction(id: number): void {
    if (!confirm('¿Estás seguro de eliminar esta función?')) return;

    this.http.delete(`http://localhost:3000/functions/${id}`).subscribe({
      next: () => this.loadFunctions(),
      error: err => {
        console.error('Error al eliminar función:', err);
        alert('No se pudo eliminar la función');
      },
    });
  }

  // ----------------------------------------
  // MODALES Y UTILIDADES
  // ----------------------------------------

  handleCreated(): void {
    this.showCreateForm = false;
    this.loadPositions();
  }

  handleUpdated(): void {
    this.editing = false;
    this.selectedPosition = null;
    this.showCreateForm = false;
    this.loadPositions();
  }

  closeModal = (): void => {
    this.selectedPosition = null;
    this.selectedFunction = null;
    this.editing = false;
    this.editingFunction = false;
    this.showCreateForm = false;
    this.showCreateFunctionForm = false;
  };

  get positionTitles(): string[] {
    return this.positions.map(p => p.title);
  }

  get paginated(): any[] {
    return this.paginatedPositions;
  }

  openCreateFunctionModal() {
    this.selectedFunction = { description: '', positionId: null };
    this.editingFunction = false;
    this.loadPositions();
    this.showCreateFunctionForm = true;
  }

  updatePaginatedFunctions(): void {
    let filtered = this.functions;

    if (this.selectedPositionFilter !== null) {
      filtered = filtered.filter(f => f.position?.id === this.selectedPositionFilter);
    }

    const start = this.functionPageIndex * this.functionPageSize;
    const end = start + this.functionPageSize;
    this.paginatedFunctions = filtered.slice(start, end);
  }

  onFunctionPageChange(event: PageEvent): void {
    this.functionPageSize = event.pageSize;
    this.functionPageIndex = event.pageIndex;
    this.updatePaginatedFunctions();
  }

  //metodo para editar funciones
  editFunction(func: any): void {
    this.selectedFunction = {
      id: func.id,
      description: func.description,
      positionId: func.position?.id ? Number(func.position.id) : null,
    };
    this.editingFunction = true;
    this.loadPositions();
    this.showCreateFunctionForm = true;
  }

}
