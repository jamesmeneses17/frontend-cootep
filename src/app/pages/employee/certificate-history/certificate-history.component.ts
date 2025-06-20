import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { CertificateService } from '../../../services/certificate.service';

@Component({
  selector: 'app-certificate-history',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './certificate-history.component.html',
  styleUrl: './certificate-history.component.css',
})
export class CertificateHistoryComponent implements OnInit {
  profile: any = null;
  sidebarOpen = false;

  selectedType: 'salario' | 'funciones' | 'historial' | null = null;
  startDateOptions: string[] = [];
  endDateOptions: string[] = [];
  startDate: string = '';
  endDate: string = '';
  selectedHistoryId: number | null = null;
  employmentOptions: any[] = [];

  today = new Date();

  constructor(private certificateService: CertificateService) {}

  ngOnInit(): void {
    this.loadEmploymentOptions();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  onSelectType(type: 'salario' | 'funciones' | 'historial') {
    console.log('🟨 Tipo seleccionado:', type);
    this.selectedType = type;

    if (type === 'historial') {
      this.loadDateRange();
    }
  }

  loadDateRange() {
    this.certificateService.getCertificateRange().subscribe({
      next: (range) => {
        console.log('✅ Rango recibido desde backend:', range);

        this.startDateOptions = range.startDates || [];
        this.endDateOptions = range.endDates || [];

        console.log('🟢 Fechas asignadas al componente:', {
          start: this.startDateOptions,
          end: this.endDateOptions,
        });
      },
      error: (err) => {
        console.error('❌ Error al obtener fechas:', err);
      },
    });
  }

  loadEmploymentOptions() {
    this.certificateService.getEmploymentHistories().subscribe((data) => {
      this.employmentOptions = data;
    });
  }

  download(type: 'salario' | 'funciones' | 'historial') {
    const payload: any = { type };

    if (type === 'historial') {
      payload.startDate = this.startDate || null;
      payload.endDate = this.endDate || null;
    } else {
      payload.historyId = this.selectedHistoryId || null;
    }

    this.certificateService.downloadCertificate(payload).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `certificado_${type}.pdf`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

  formatDateToYearPeriod(dateStr: string): string {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const period = month <= 6 ? '1' : '2';
    return `${year}-${period}`;
  }

  formatDateToUpper(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    };

    return date.toLocaleDateString('es-CO', options).toUpperCase();
  }
}
