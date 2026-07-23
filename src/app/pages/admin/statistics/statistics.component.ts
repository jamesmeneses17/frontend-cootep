import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BaseChartDirective } from 'ng2-charts';
import { environment } from '../../../../enviroments/enviroment';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  // Empleados activos
  totalActivos: number = 0;
  totalHistoriasLaborales: number = 0;


  // Contratos
  contractLabels: string[] = [];
  contractData: number[] = [];

  // Logins
  loginLabels: string[] = [];
  loginData: number[] = [];

  // Estados
  employeeStatusLabels: string[] = [];
  employeeStatusData: number[] = [];

  // Nuevas contrataciones
  hireLabels: string[] = [];
  hireData: number[] = [];

  // Funciones por cargo
  functionLabels: string[] = [];
  functionData: number[] = [];

  // Para gráfico de cargos
  employeesByPositionLabels: string[] = [];
  employeesByPositionData: number[] = [];

  // Para tarjeta resumen
  multipleContractsTotal: number = 0;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadActiveEmployees();
    this.loadContractStats();
    this.loadLoginStats();
    this.loadEmployeeStatus();
    this.loadNewHiresByMonth();
    this.loadFunctionStats();
    this.loadEmploymentHistoryCount();
    this.loadEmployeesByPosition();
    this.loadEmployeesWithMultipleContracts();
    this.loadTopEmployeesWithMultipleContracts();


  }

  // ─── CARGAS DE DATOS ──────────────────────────────────────────────

  loadActiveEmployees() {
    this.http.get<number>(`${environment.apiUrl}/statistics/active-employees`)
      .subscribe(data => this.totalActivos = data);
  }

  loadContractStats() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/contract-types`)
      .subscribe(data => {
        this.contractLabels = data.map(item => item.name);
        this.contractData = data.map(item => +item.count);
      });
  }

  loadLoginStats() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/login-frequency`)
      .subscribe(data => {
        this.loginLabels = data.map(item => item.date);
        this.loginData = data.map(item => +item.total);
      });
  }

  loadEmployeeStatus() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/employee-status`)
      .subscribe(data => {
        this.employeeStatusLabels = data.map(item => item.status);
        this.employeeStatusData = data.map(item => +item.count);
      });
  }

  loadNewHiresByMonth() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/new-hires`)
      .subscribe(data => {
        this.hireLabels = data.map(item => item.month);
        this.hireData = data.map(item => +item.count);
      });
  }

  loadFunctionStats() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/functions-by-position`)
      .subscribe(data => {
        this.functionLabels = data.map(item => item.title);
        this.functionData = data.map(item => +item.functionCount);
      });
  }
  loadEmploymentHistoryCount() {
    this.http.get<number>(`${environment.apiUrl}/statistics/employment-history-count`)
      .subscribe(data => this.totalHistoriasLaborales = data);
  }

  loadEmployeesByPosition() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/employees-by-position`)
      .subscribe(data => {
        this.employeesByPositionLabels = data.map(item => item.cargo);
        this.employeesByPositionData = data.map(item => +item.cantidad);
      });
  }

  loadEmployeesWithMultipleContracts() {
    this.http.get<number>(`${environment.apiUrl}/statistics/employees-multiple-contracts`)
      .subscribe(data => this.multipleContractsTotal = data);
  }



  // ─── GETTERS PARA DATOS PROCESADOS ────────────────────────────────

  get totalContracts(): number {
    return this.contractData.reduce((a, b) => a + b, 0);
  }

  get totalLogins(): number {
    return this.loginData.reduce((a, b) => a + b, 0);
  }

  get employeeStatusChartData() {
    return {
      labels: this.employeeStatusLabels,
      datasets: [{ data: this.employeeStatusData }]
    };
  }

  get contractChartData() {
    return {
      labels: this.contractLabels,
      datasets: [{ data: this.contractData, label: 'Contratos' }]
    };
  }

  get hireChartData() {
    return {
      labels: this.hireLabels,
      datasets: [{ data: this.hireData, label: 'Nuevas Contrataciones', fill: true }]
    };
  }

  get functionChartData() {
    return {
      labels: this.functionLabels,
      datasets: [{ data: this.functionData, label: 'Funciones' }]
    };
  }

  multiContractEmployeeLabels: string[] = [];
  multiContractEmployeeData: number[] = [];

  loadTopEmployeesWithMultipleContracts() {
    this.http.get<any[]>(`${environment.apiUrl}/statistics/top-multiple-contracts`)
      .subscribe(data => {
        this.multiContractEmployeeLabels = data.map(item => item.fullName);
        this.multiContractEmployeeData = data.map(item => +item.totalContracts);
      });
  }


}
