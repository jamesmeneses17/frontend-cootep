import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-position-form',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './position-form.component.html',
})
export class PositionFormComponent {
  @Input() data: any = { title: '', description: '' };
  @Input() existingTitles: string[] = [];
  @Input() editing: boolean = false;

  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  save() {
    const name = this.data.title.trim().toLowerCase();

    const isDuplicate = this.existingTitles
      .map(t => t.toLowerCase())
      .includes(name);

    //  valida duplicados si NO está en modo edición
    if (!this.editing && isDuplicate) {
      alert('Ya existe un cargo con ese nombre.');
      return;
    }

    this.onSave.emit(this.data);
  }

  cancel() {
    this.onCancel.emit();
  }
}
