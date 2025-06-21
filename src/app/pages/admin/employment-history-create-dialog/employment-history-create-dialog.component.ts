import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employment-history-create-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

  searchCedula: string = '';
  selectedEmployee: any = null;
  notFound: boolean = false;

  @Output() saved = new EventEmitter<void>();
  @Output() onCreated = new EventEmitter<void>();

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
    this.http.get<{ data: any[] }>('https://backend-cootep.onrender.com/employees')
      .subscribe(response => {
        this.employees = response.data;
      });
  }

  loadPositions(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/positions')
      .subscribe(data => this.positions = data);
  }

  loadContracts(): void {
    this.http.get<any[]>('https://backend-cootep.onrender.com/contract-type')
      .subscribe(data => this.contracts = data);
  }

  searchEmployeeByCedula(): void {
    const trimmed = this.searchCedula.trim();
    if (trimmed.length < 5) {
      this.selectedEmployee = null;
      this.notFound = false;
      this.form.patchValue({ employeeId: '' });
      return;
    }

    const found = this.employees.find(e => e.national_id === trimmed);

    if (found) {
      this.selectedEmployee = found;
      this.form.patchValue({ employeeId: found.id });
      this.notFound = false;
    } else {
      this.selectedEmployee = null;
      this.form.patchValue({ employeeId: '' });
      this.notFound = true;
    }
  }

  onSubmit(): void {
    if (this.form.invalid || !this.selectedEmployee) return;

    const formValue = this.form.value;

    const payload = {
      ...formValue,
      startDate: new Date(formValue.startDate).toISOString().split('T')[0],
      endDate: formValue.endDate
        ? new Date(formValue.endDate).toISOString().split('T')[0]
        : null
    };

    this.http.post('https://backend-cootep.onrender.com/employment-history', payload)
      .subscribe({
        next: () => {
          alert('Historial laboral creado correctamente.');
          this.form.reset();
          this.searchCedula = '';
          this.selectedEmployee = null;
          this.notFound = false;
          this.saved.emit();
          this.onCreated.emit();
        },
        error: (err) => {
          console.error('Error al crear historial:', err);
          alert('Ocurrió un error al crear el historial laboral.');
        }
      });
  }
@Output() cancel = new EventEmitter<void>(); 

  onCancel(): void {
    this.form.reset();
    this.searchCedula = '';
    this.selectedEmployee = null;
    this.notFound = false;
    this.cancel.emit(); 
  }
}
