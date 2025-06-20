// ✅ TS actualizado y funcional con validación numérica y PATCH
import { Component, Input, OnInit, Output, EventEmitter, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  @Input() data: any; // historial laboral a editar
  @Input() positions: any[] = [];
  @Input() contracts: any[] = [];
  @Output() onUpdated = new EventEmitter<void>();

  form!: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      employeeId: [this.data?.employee?.id || '', Validators.required],
      positionId: [this.data?.position?.id || '', Validators.required],
      contractTypeId: [this.data?.contractType?.id || '', Validators.required],
      salary: [this.data?.salary || 0, [Validators.required, Validators.min(0)]],
      startDate: [this.data?.startDate || '', Validators.required],
      endDate: [this.data?.endDate || ''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const { employeeId, positionId, contractTypeId, salary, endDate, startDate } = this.form.value;

    const payload = {
      employeeId: Number(employeeId),
      positionId: Number(positionId),
      contractTypeId: Number(contractTypeId),
      salary: Number(salary),
      startDate,
      endDate: endDate === '' ? null : endDate
    };

    this.http.patch(`http://localhost:3000/employment-history/${this.data.id}`, payload).subscribe({
      next: () => {
        alert('Historial actualizado correctamente.');
        this.onUpdated.emit();
      },
      error: (err) => {
        console.error('Error al actualizar historial:', err);
        alert('Hubo un problema al actualizar.');
      }
    });
  }

  onCancel(): void {
    this.form.reset();
  }
}
