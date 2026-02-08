import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
 constructor(private router: Router) {}

  irAReportarPerro() {
    this.router.navigate(['/reportar-perro/crear']);
  }

  irACampanas() {
    this.router.navigate(['/campanas/ver']);
  }

  irAHogares() {
    this.router.navigate(['/hogares/ver']);
  }

  irAReportes() {
    this.router.navigate(['/reportar-perro/ver']);
  }
}
