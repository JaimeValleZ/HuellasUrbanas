import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReportePerro {
  descripcion: string;
  latitud: number;
  longitud: number;
  direccion?: string;
  estado: string;
  imagenUrl?: string;
}

export interface DetalleReportePerro {
  id: number;
  descripcion: string;
  latitud: number;
  longitud: number;
  direccion: string;
  imagenUrl: string;
  fechaReporte: string;
  estado: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private apiUrl = `${environment.apiUrl}/reporte-perro`;

  constructor(private http: HttpClient) { }


  registrarReportePerro(reporte: ReportePerro, imagen?: File): Observable<DetalleReportePerro> {
    const formData = new FormData();
    formData.append('reporte', new Blob([JSON.stringify(reporte)], { type: 'application/json' }));
    if (imagen) {
      formData.append('imagen', imagen);
    }

    return this.http.post<DetalleReportePerro>(this.apiUrl, formData);
  }

  listarReportes(page: number = 0, size: number = 10): Observable<PageResponse<DetalleReportePerro>> {
    return this.http.get<PageResponse<DetalleReportePerro>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  verReporte(id: number): Observable<DetalleReportePerro> {
  return this.http.get<DetalleReportePerro>(`${this.apiUrl}/ver/${id}`);
}



}
