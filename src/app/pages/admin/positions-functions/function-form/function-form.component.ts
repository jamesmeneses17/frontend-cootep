import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-function-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './function-form.component.html',
})
export class FunctionFormComponent {
  @Input() data: any = { description: '', positionId: null };
  @Input() positions: any[] = [];
  @Input() editing: boolean = false;
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();

  save() {
    this.data.positionId = Number(this.data.positionId);

    if (this.data.description.trim() && this.data.positionId) {
      this.onSave.emit(this.data);
    } else {
      alert('Debe completar todos los campos.');
    }
  }


}
