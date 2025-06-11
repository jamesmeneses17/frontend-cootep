import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getProfile() {
    return this.http.get('http://localhost:3000/employees/profile');
  }

  getEmploymentHistory(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:3000/employment-history');
  }




}
