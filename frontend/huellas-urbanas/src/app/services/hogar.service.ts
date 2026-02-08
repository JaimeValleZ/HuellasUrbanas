import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Hogar {
  id: number;
  nombrePropietario: string;
  nombreHogar: string;
  telefono: string;
  localidad: string;
  estado: string;
  imagenUrl1: string;
}

export interface DetalleHogar {
  id: number;
  nombrePropietario: string;
  email: string;
  nombreHogar: string;
  telefono: string;
  direccion: string;
  localidad: string;
  tipoVivienda: string;
  tamanoVivienda: number;
  espacioExterior: string;
  otrosAnimales: string;
  ninosEnCasa: string;
  razonAdopcion: string;
  estado: string;
  imagenUrl1: string;
  imagenUrl2: string;
  imagenUrl3: string;
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
export class HogarService {

  private apiUrl = `${environment.apiUrl}/hogares`;

  constructor(private http: HttpClient) { }

  registrarHogar(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  listarHogares(page: number = 0): Observable<PageResponse<Hogar>> {
    return this.http.get<PageResponse<Hogar>>(`${this.apiUrl}?page=${page}`);
  }

  verHogar(id: number): Observable<DetalleHogar> {
    return this.http.get<DetalleHogar>(`${this.apiUrl}/hogar/${id}`);
  }
}
