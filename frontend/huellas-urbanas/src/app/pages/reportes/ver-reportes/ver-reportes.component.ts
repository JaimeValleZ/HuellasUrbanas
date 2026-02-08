import { Component, OnInit, AfterViewInit } from '@angular/core';
// Use a type-only import so Leaflet isn't evaluated during SSR/bundling
import type * as L from 'leaflet';
import { DetalleReportePerro, ReportesService } from '../../../services/reportes.service';

@Component({
  selector: 'app-ver-reportes',
  templateUrl: './ver-reportes.component.html',
  styleUrls: ['./ver-reportes.component.css']
})
export class VerReportesComponent implements OnInit, AfterViewInit {

  reportes: DetalleReportePerro[] = [];
  map!: L.Map;
  markers: L.Marker[] = [];
  // runtime Leaflet module (set after dynamic import)
  private leaflet: any;
  cargando = true;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    this.cargarReportes();
  }

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined') return;

    try {
      // prevent Vite from pre-evaluating during SSR
      const leaflet = await import(/* @vite-ignore */ 'leaflet');
      this.leaflet = leaflet;

      // set icon paths to local assets (ensure these files exist in src/assets/leaflet)
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'src/assets/leaflet/marker-icon-2x.png',
        iconUrl: 'src/assets/leaflet/marker-icon.png',
        shadowUrl: 'src/assets/leaflet/marker-shadow.png'
      });

      this.inicializarMapa();
    } catch (err) {
      console.error('[VerReportes] error cargando Leaflet:', err);
    }
  }

  inicializarMapa(): void {
    const leaflet = this.leaflet || (window as any).L;
    if (!leaflet) {
      console.error('[VerReportes] Leaflet no está disponible en inicializarMapa');
      return;
    }

    this.map = leaflet.map('mapa-reportes').setView([4.711, -74.0721], 12);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);
      // Force reflow in case container sizing wasn't ready when Leaflet initialized
      setTimeout(() => {
        try {
          this.map.invalidateSize();
          const h = document.getElementById('mapa-reportes')?.clientHeight;
          console.debug('[VerReportes] invalidateSize called, altura del contenedor:', h);
        } catch (err) {
          console.warn('[VerReportes] invalidateSize failed:', err);
        }
      }, 200);
    // If report data already loaded, add markers now
    if (this.reportes && this.reportes.length > 0) {
      this.actualizarMarcadores();
    }
  }

  cargarReportes(): void {
    this.cargando = true;
    this.reportesService.listarReportes().subscribe({
      next: (res) => {
        this.reportes = res.content;
        this.cargando = false;
        this.actualizarMarcadores();
      },
      error: () => (this.cargando = false)
    });
  }

  actualizarMarcadores(): void {
    if (!this.map) {
      // map not ready yet; markers will be added after inicializarMapa runs
      console.debug('[VerReportes] actualizarMarcadores: mapa no inicializado aún');
      return;
    }

    this.markers.forEach(marker => marker.remove());
    this.markers = [];

    this.reportes.forEach((reporte) => {
      if (reporte.latitud && reporte.longitud) {
        const leaflet = this.leaflet || (window as any).L;
        if (!leaflet) return;

        const marker = leaflet.marker([reporte.latitud, reporte.longitud])
          .addTo(this.map)
          .bindPopup(`
            <strong>${reporte.descripcion}</strong><br>
            Estado: ${reporte.estado}<br>
            ${reporte.direccion || ''}
          `);
        this.markers.push(marker);
      }
    });
  }

  centrarEnMiUbicacion(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.map.setView([pos.coords.latitude, pos.coords.longitude], 14);
      });
    }
  }

  actualizarMapa(): void {
    this.cargarReportes();
  }
}
