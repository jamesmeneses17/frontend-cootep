import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarOpen = false;
  windowWidth: number = window.innerWidth;

  constructor() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth >= 768) {
        this.sidebarOpen = true;
      } else {
        this.sidebarOpen = false;
      }
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar() {
    if (this.windowWidth < 768) {
      this.sidebarOpen = false;
    }
  }
}
