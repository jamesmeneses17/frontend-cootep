import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../components/shared/sidebar/sidebar.component';
import { HeaderComponent } from '../../../components/shared/header/header.component';
import { FooterComponent } from '../../../components/shared/footer/footer.component';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './help.component.html'
})
export class HelpComponent implements OnInit {
  profile: any = null;
  sidebarOpen = false;

  faqs = [
    {
      question: '¿Cómo puedo solicitar un certificado?',
      answer: 'Desde el panel de empleado, haz clic en “Solicitar Certificado” y selecciona el tipo que deseas.',
      open: false,
    },
    {
      question: '¿Qué hago si mi información está incorrecta?',
      answer: 'Debes comunicarte con el área administrativa para que revisen y corrijan tus datos personales o laborales.',
      open: false,
    },
    {
      question: '¿Dónde puedo ver certificados anteriores?',
      answer: 'En el módulo “Historial de Certificados” puedes ver todos los certificados generados previamente.',
      open: false,
    },
    {
      question: '¿Cómo cierro sesión?',
      answer: 'Haz clic en el icono de salida ubicado en la parte superior derecha del panel.',
      open: false,
    }
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getProfile().subscribe({
      next: (data) => (this.profile = data),
      error: (err) => console.error('Error al cargar perfil:', err),
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleFaq(index: number) {
    this.faqs[index].open = !this.faqs[index].open;
  }
}
