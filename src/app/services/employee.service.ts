import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from '../interfaces/employee.interface';

import { environment } from '../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(`${this.apiUrl}/employees/profile`);
  }

  getEmploymentHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employment-history`);
  }

  getAllEmploymentHistory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employment-history/all`);
  }

  getHistoryDateRange() {
    return this.http.get<{ startDates: string[]; endDates: string[] }>(
      `${this.apiUrl}/employment-history/range`
    );
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees`);
  }

  getAvailableStartDates(): Observable<string[]> {
    return this.http
      .get<{ startDates: string[] }>(`${this.apiUrl}/employment-history/range`)
      .pipe(map((res) => res.startDates));
  }

  getEmployees(page: number, limit: number, searchTerm = '', status = '') {
    const params = new URLSearchParams();

    if (searchTerm) params.append('search', searchTerm);
    if (status && status !== 'all') params.append('status', status);

    return this.http.get<any>(`${this.apiUrl}/employees?page=${page}&limit=${limit}&${params.toString()}`);
  }


  getEmployeeDetails(id: number) {
    return this.http.get<any>(`${this.apiUrl}/employees/${id}/details`);
  }

  updateEmployee(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}/employees/${id}`, data);
  }

  createEmployee(data: any) {
    return this.http.post(`${this.apiUrl}/employees`, data);
  }

  getPositions() {
    return this.http.get<any[]>(`${this.apiUrl}/positions`);
  }

  getContractTypes() {
    return this.http.get<any[]>(`${this.apiUrl}/contract-type`);
  }

  getRoles() {
    return this.http.get<any[]>(`${this.apiUrl}/roles`);
  }

  getStatuses() {
    return this.http.get<any[]>(`${this.apiUrl}/status`);
  }


  updateEmploymentHistory(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}/employment-history/${id}`, data);
  }

  createFullEmployee(data: any) {
    return this.http.post(`${this.apiUrl}/employees/full`, data);
  }


}
