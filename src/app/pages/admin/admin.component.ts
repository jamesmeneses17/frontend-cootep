import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderAdminComponent } from '../../components/shared/header-admin/header-admin.component'; // ✅ Nuevo header del admin
import { SidebarAdminComponent } from '../../components/shared/sidebar-admin/sidebar-admin.component';
import { FooterComponent } from '../../components/shared/footer/footer.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderAdminComponent, 
    SidebarAdminComponent,
    FooterComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'] 
})
export class AdminComponent {
  sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  profile: any = {
    nombres: 'Administrador',
    apellidos: '',
  };
}
