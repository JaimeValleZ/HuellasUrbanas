import { Component, OnInit } from '@angular/core';
import { Hogar, HogarService } from '../../../services/hogar.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-listar-hogares',
  templateUrl: './listar-hogares.component.html',
  styleUrl: './listar-hogares.component.css'
})
export class ListarHogaresComponent implements OnInit {

  hogares: Hogar[] = [];
  baseUrl = environment.apiUrl.replace('/uploads', ''); // si tus imágenes están en la raíz del backend
  currentPage = 0;
  totalPages = 0;

  constructor(private hogarService: HogarService) { }

  ngOnInit(): void {
    this.cargarHogares();
  }

  cargarHogares(page: number = 0) {
    this.hogarService.listarHogares(page).subscribe({
      next: (res) => {
        this.hogares = res.content;
        this.totalPages = res.totalPages;
        this.currentPage = res.number;
      },
      error: (err) => console.error(err)
    });
  }

  imagenCompleta(url: string): string {
    // Si viene algo como "/uploads/archivo.png", le anteponemos el dominio
    return url ? `${this.baseUrl}${url}` : 'assets/img/default-house.png';
  }

}
