import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';

@Injectable({ providedIn: 'root' })
export class CertificateService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  downloadCertificate(payload: {
    type: 'salario' | 'funciones' | 'historial';
    startDate?: string;
    endDate?: string;
    employmentHistoryId?: number;
    positionId?: number;

  }) {
    return this.http.post(`${this.apiUrl}/certificates/generate`, payload, {
      responseType: 'blob',
    });
  }

  getCertificateRange() {
    return this.http.get<{ startDates: string[]; endDates: string[] }>(
      `${this.apiUrl}/employment-history/range`
    );
  }

  getEmploymentHistories() {
    return this.http.get<any[]>(`${this.apiUrl}/employment-history/all`);
  }

}
