import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampanasService } from '../../services/campanas.service';

@Component({
  selector: 'app-ver-detalle',
  templateUrl: './ver-detalle.component.html',
  styleUrl: './ver-detalle.component.css'
})
export class VerDetalleComponent implements OnInit {

  campana: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private campanasService: CampanasService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.campanasService.obtenerCampanaPorId(+id).subscribe({
        next: (data) => (this.campana = data),
        error: (err) => console.error('Error al cargar campaña:', err)
      });
    }
  }

  volver(): void {
    this.router.navigate(['/campanas/ver']);
  }

  getImagenUrl(): string {
    return this.campana?.imagenUrl
      ? `http://localhost:8080${this.campana.imagenUrl}`
      : 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  }

}
