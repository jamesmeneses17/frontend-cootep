import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
formData: any;
  constructor(public router: Router) { }

  @Input() profile: any;
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
