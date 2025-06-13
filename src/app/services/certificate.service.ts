import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class CertificateService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  downloadCertificate(payload: {
    type: 'salario' | 'funciones' | 'historial';
    startDate?: string;
    endDate?: string;
  }) {
    return this.http.post(`${this.apiUrl}/certificates/generate`, payload, {
      responseType: 'blob',
    });
  }

  getCertificateRange() {
    return this.http.get<{ startDates: string[]; endDates: string[] }>(
      `${this.apiUrl}/certificates/range`
    );
  }

  getEmploymentHistories() {
    return this.http.get<any[]>(`${this.apiUrl}/certificates/history-list`);
  }

}
