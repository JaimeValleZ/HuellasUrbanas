import { Component, OnInit } from '@angular/core';
import { CampanasService } from '../../services/campanas.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ver-campanas',
  templateUrl: './ver-campanas.component.html',
  styleUrl: './ver-campanas.component.css'
})
export class VerCampanasComponent implements OnInit {

  campanas: any[] = [];
  page = 0;
  size = 10;
  totalPages = 0;
  apiUrl = environment.apiUrl;

  constructor(private campanasService: CampanasService) {}

  ngOnInit(): void {
    this.cargarCampanas();
  }

  cargarCampanas(): void {
    this.campanasService.listarCampanas(this.page, this.size).subscribe({
      next: (response) => {
        this.campanas = response.content;
        this.totalPages = response.totalPages;
      },
      error: (error) => {
        console.error('Error al listar campañas:', error);
      }
    });
  }

  siguientePagina(): void {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.cargarCampanas();
    }
  }

  anteriorPagina(): void {
    if (this.page > 0) {
      this.page--;
      this.cargarCampanas();
    }
  }

    getImagenUrl(imagen: string): string {
    return `${this.apiUrl}${imagen}`;
  }

}
