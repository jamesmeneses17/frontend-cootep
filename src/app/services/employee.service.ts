import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee.interface'; // ✅ interfaz en inglés

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get('http://localhost:3000/employees/profile');
  }

  getEmploymentHistory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employment-history');
  }

  getAllEmploymentHistory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employment-history/all');
  }

  getHistoryDateRange() {
    return this.http.get<{ startDates: string[]; endDates: string[] }>(
      'http://localhost:3000/employment-history/range'
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:3000/employees');
  }
}
