import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../services/employee.service';
import { SidebarComponent } from "../../../components/shared/sidebar/sidebar.component";
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent, FooterComponent],
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  laborInfo: any = null;
employmentHistory: any = null;
  sidebarOpen = false;
  menuOpen = false;
  windowWidth: number = window.innerWidth;


  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    // Obtener perfil personal
    this.employeeService.getProfile().subscribe({
      next: (data) => {
        console.log('Perfil cargado:', data);
        this.profile = data;
      },
      error: (err) => console.error('Error al obtener perfil:', err),
    });

    // Obtener historial laboral
    this.employeeService.getEmploymentHistory().subscribe({
      next: (data) => {
        console.log('Historial laboral cargado:', data);
        this.employmentHistory = data;
      },
      error: (err) => console.error('Error al obtener historial laboral:', err),
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }

  changePassword() {
    alert('Funcionalidad en desarrollo.');
  }
  @HostListener('window:resize')
  updateWindowWidth() {
    this.windowWidth = window.innerWidth;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }




}
