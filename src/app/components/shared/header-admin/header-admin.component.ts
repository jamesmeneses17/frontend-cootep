import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-admin.component.html',
})
export class HeaderAdminComponent {
  @Input() sidebarOpen = false;
  @Input() toggleSidebar!: () => void;

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  logout() {
    localStorage.clear();
    window.location.href = '/';
  }
}
