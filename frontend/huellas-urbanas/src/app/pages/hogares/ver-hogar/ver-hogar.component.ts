import { Component, OnInit } from '@angular/core';
import { DetalleHogar, HogarService } from '../../../services/hogar.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-ver-hogar',
  templateUrl: './ver-hogar.component.html',
  styleUrl: './ver-hogar.component.css'
})
export class VerHogarComponent implements OnInit {

  hogar?: DetalleHogar;
  loading = true;
  imageBasePath = environment.apiUrl; // ajusta si tu backend corre en otro puerto

  constructor(
    private route: ActivatedRoute,
    private hogarService: HogarService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.hogarService.verHogar(id).subscribe({
      next: (data) => {
        this.hogar = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando hogar', err);
        this.loading = false;
      }
    });
    
  }

    imagenCompleta(url: string): string {
    // Si viene algo como "/uploads/archivo.png", le anteponemos el dominio
    return url ? `${this.imageBasePath}${url}` : 'assets/img/default-house.png';
  }

}
