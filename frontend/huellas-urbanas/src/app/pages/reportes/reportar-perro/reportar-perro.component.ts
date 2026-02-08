import { Component, AfterViewInit } from '@angular/core';
import { ReportesService, ReportePerro } from '../../../services/reportes.service';
import type * as L from 'leaflet';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reportar-perro',
  templateUrl: './reportar-perro.component.html',
  styleUrls: ['./reportar-perro.component.css']
})
export class ReportarPerroComponent implements AfterViewInit {

  descripcion = '';
  direccion = '';
  estado = 'SIN_RESCATAR';
  imagenFile: File | null = null;
  imagenPreview: string | null = null;
  latitud: number | null = null;
  longitud: number | null = null;
  cargando = false;

  private mapa!: L.Map;
  private marcador!: L.Marker;
  private leaflet: any;
  private geoWatchId: number | null = null;

  constructor(private reportesService: ReportesService) {}

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined') return;

    const leaflet = await import('leaflet');
    this.leaflet = leaflet;

    leaflet.Icon.Default.mergeOptions({
      iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
      iconUrl: 'assets/leaflet/marker-icon.png',
      shadowUrl: 'assets/leaflet/marker-shadow.png'
    });

    this.mapa = leaflet.map('mapa').setView([4.711, -74.0721], 12);

    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.mapa);

    setTimeout(() => {
      try {
        this.mapa.invalidateSize();
      } catch {}
    }, 200);

    this.mapa.on('click', (e: any) => {
      this.latitud = e.latlng.lat;
      this.longitud = e.latlng.lng;
      this.agregarMarcador(this.latitud!, this.longitud!);
    });
  }

  usarMiUbicacion() {
    if (!navigator.geolocation) {
      Swal.fire({
        icon: 'error',
        title: 'Geolocalización no disponible',
        text: 'Tu navegador no soporta geolocalización.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.latitud = pos.coords.latitude;
        this.longitud = pos.coords.longitude;
        this.agregarMarcador(this.latitud!, this.longitud!);
        this.mapa.setView([this.latitud!, this.longitud!], 16);

        this.direccion = `Ubicación detectada (Lat: ${this.latitud!.toFixed(5)}, Lng: ${this.longitud!.toFixed(5)})`;
      },
      () =>
        Swal.fire({
          icon: 'warning',
          title: 'No se pudo obtener tu ubicación',
          text: 'Asegúrate de permitir el acceso a la ubicación.',
        })
    );
  }

  private agregarMarcador(lat: number, lng: number) {
    if (this.marcador) {
      this.mapa.removeLayer(this.marcador);
    }
    this.marcador = this.leaflet.marker([lat, lng]).addTo(this.mapa);
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenFile = file;
      const reader = new FileReader();
      reader.onload = e => this.imagenPreview = e.target?.result as string;
      reader.readAsDataURL(file);
    }
  }

  enviarReporte() {
    if (!this.descripcion.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Falta descripción',
        text: 'Por favor ingresa una descripción del perro.',
      });
      return;
    }

    if (!this.latitud || !this.longitud) {
      Swal.fire({
        icon: 'warning',
        title: 'Ubicación requerida',
        text: 'Selecciona una ubicación en el mapa o usa tu ubicación actual.',
      });
      return;
    }

    const nuevoReporte: ReportePerro = {
      descripcion: this.descripcion.trim(),
      latitud: this.latitud!,
      longitud: this.longitud!,
      direccion: this.direccion || '',
      estado: this.estado
    };

    this.cargando = true;

    this.reportesService.registrarReportePerro(nuevoReporte, this.imagenFile!).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Reporte enviado',
          text: '¡El reporte ha sido enviado correctamente!',
        });
        this.resetForm();
      },
      error: (err) => {
        console.error('Error al enviar reporte:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al enviar reporte',
          text: 'Ocurrió un problema. Intenta nuevamente.',
        });
      },
      complete: () => this.cargando = false
    });
  }

  resetForm() {
    this.descripcion = '';
    this.direccion = '';
    this.estado = 'SIN_RESCATAR';
    this.imagenFile = null;
    this.imagenPreview = null;
    this.latitud = null;
    this.longitud = null;
    if (this.marcador) this.mapa.removeLayer(this.marcador);
  }
}
