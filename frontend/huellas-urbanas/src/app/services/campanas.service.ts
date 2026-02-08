import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampanasService {
  private apiUrl = `${environment.apiUrl}/campanas`;

  constructor(private http: HttpClient) { }

  crearCampana(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  listarCampanas(page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  obtenerCampanaPorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/campana/${id}`);
  }

}
