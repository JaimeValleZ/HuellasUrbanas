import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleReportePerro, ReportesService } from '../../../services/reportes.service';
// Use type-only import to avoid SSR evaluating leaflet
import type * as L from 'leaflet';

@Component({
  selector: 'app-detalle-reporte',
  templateUrl: './detalle-reporte.component.html',
  styleUrls: ['./detalle-reporte.component.css']
})
export class DetalleReporteComponent implements OnInit {

  reporte?: DetalleReportePerro;
  cargando = true;
  // runtime leaflet module and map
  private leaflet: any;
  private map!: L.Map;
  private marker!: L.Marker;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reportesService: ReportesService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.reportesService.verReporte(id).subscribe({
        next: (data) => {
          this.reporte = data;
          this.cargando = false;
          // Try initialize map now that we have the report
            void this.initMapForReporte();
        },
        error: (err) => {
          console.error('Error al cargar el reporte:', err);
          this.cargando = false;
        }
      });
    } else {
      this.router.navigate(['/reportes']);
    }
  }

  async ngAfterViewInit(): Promise<void> {
    // if reporte was already loaded before view init, try init map
    if (this.reporte) {
      void this.initMapForReporte();
    }
  }

  private async initMapForReporte(): Promise<void> {
    if (!this.reporte) return;
    if (typeof window === 'undefined') return;

    try {
      const leaflet = await import(/* @vite-ignore */ 'leaflet');
      this.leaflet = leaflet;

      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
        iconUrl: 'assets/leaflet/marker-icon.png',
        shadowUrl: 'assets/leaflet/marker-shadow.png'
      });

      // ensure DOM element exists
      const el = document.getElementById('mapa-detalle');
      if (!el) {
        console.warn('Elemento mapa-detalle no encontrado en el DOM');
        return;
      }

      // initialize map if not yet
      if (!this.map) {
        this.map = leaflet.map('mapa-detalle').setView([this.reporte.latitud || 4.711, this.reporte.longitud || -74.0721], 15);
        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(this.map);
        // Sometimes the container is not fully sized when Leaflet initializes
        // Call invalidateSize shortly after to force a proper render.
        setTimeout(() => {
          try {
            this.map.invalidateSize();
            console.debug('mapa-detalle invalidateSize called');
          } catch (err) {
            console.warn('invalidateSize failed:', err);
          }
        }, 200);
      }
        
        // If container is too small, enforce a minimum height to ensure Leaflet renders
        if (el.clientHeight < 50) {
          console.debug('[DetalleReporte] mapa-detalle muy pequeño, aplicando altura mínima 256px');
          (el as HTMLElement).style.height = '256px';
        }

      // add marker
      if (this.reporte.latitud && this.reporte.longitud) {
        // remove previous marker
        if (this.marker) this.marker.remove();
        this.marker = leaflet.marker([this.reporte.latitud, this.reporte.longitud]).addTo(this.map)
          .bindPopup(`<strong>${this.reporte.descripcion}</strong><br>${this.reporte.direccion || ''}`).openPopup();
      }
    } catch (err) {
      console.error('Error inicializando mapa detalle:', err);
    }
  }

  volver(): void {
    this.router.navigate(['/reportar-perro/ver']);
  }

  marcarComoRescatado(): void {
    alert('Funcionalidad pendiente: marcar como rescatado');
  }

  contactarReportante(): void {
    alert('Funcionalidad pendiente: contactar al reportante');
  }

    getImagenUrl(): string {
    return this.reporte?.imagenUrl
      ? `http://localhost:8080${this.reporte.imagenUrl}`
      : 'https://via.placeholder.com/600x400?text=Sin+Imagen';
  }
}
