import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employment-history-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employment-history-view.component.html',
  styleUrls: ['./employment-history-view.component.css']
})
export class EmploymentHistoryViewComponent {
  @Input() history: any;
  @Input() onClose: () => void = () => {};

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
}
