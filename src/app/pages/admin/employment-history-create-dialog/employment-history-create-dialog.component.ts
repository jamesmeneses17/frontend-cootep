import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employment-history-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employment-history-create-dialog.component.html',
  styleUrls: ['./employment-history-create-dialog.component.css']
})
export class EmploymentHistoryCreateDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  form!: FormGroup;

  employees: any[] = [];
  positions: any[] = [];
  contracts: any[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: ['', Validators.required],
      positionId: ['', Validators.required],
      contractTypeId: ['', Validators.required],
      salary: [null, [Validators.required, Validators.min(0)]],
      startDate: ['', Validators.required],
      endDate: ['']
    });

    this.loadEmployees();
    this.loadPositions();
    this.loadContracts();
  }

  loadEmployees(): void {
    this.http.get<{ data: any[] }>('http://localhost:3000/employees')
      .subscribe(response => {
        this.employees = response.data;
      });
  }


  loadPositions(): void {
    this.http.get<any[]>('http://localhost:3000/positions')
      .subscribe(data => this.positions = data);
  }

  loadContracts(): void {
    this.http.get<any[]>('http://localhost:3000/contract-type')
      .subscribe(data => this.contracts = data);
  }

  @Output() saved = new EventEmitter<void>();
  @Output() onCreated = new EventEmitter<void>();


  onSubmit(): void {
    if (this.form.invalid) return;

    const formValue = this.form.value;

    const payload = {
      ...formValue,
      startDate: new Date(formValue.startDate).toISOString().split('T')[0],
      endDate: formValue.endDate
        ? new Date(formValue.endDate).toISOString().split('T')[0]
        : null
    };

    this.http.post('http://localhost:3000/employment-history', payload)
      .subscribe({
        next: () => {
          alert('Historial laboral creado correctamente.');
          this.form.reset();
          this.saved.emit(); // dispara el evento al padre
          this.onCreated.emit(); // Notifica al padre que se creó

        },
        error: (err) => {
          console.error('Error al crear historial:', err);
          alert('Ocurrió un error al crear el historial laboral.');
        }
      });
  }

  onCancel(): void {
    // Lógica para cerrar el modal (puede ser emitido o mediante shared state)
    this.form.reset();
  }
}
