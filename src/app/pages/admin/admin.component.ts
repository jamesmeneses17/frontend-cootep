import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdminComponent } from '../../components/shared/header-admin/header-admin.component';
import { SidebarAdminComponent } from '../../components/shared/sidebar-admin/sidebar-admin.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarAdminComponent,
    FooterComponent,
    HeaderAdminComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
  closeSidebar() {
    this.sidebarOpen = false;
  }

  profile: any = {
    nombres: 'Administrador',
    apellidos: '',
  };





}
