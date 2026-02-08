import { Component } from '@angular/core';
import { HogarService } from '../../../services/hogar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar-hogar',
  templateUrl: './registrar-hogar.component.html',
  styleUrl: './registrar-hogar.component.css'
})
export class RegistrarHogarComponent {
  formData: any = {
    nombrePropietario: '',
    email: '',
    nombreHogar: '',
    telefono: '',
    direccion: '',
    localidad: '',
    tipoVivienda: '',
    tamanoVivienda: '',
    espacioExterior: '',
    otrosAnimales: '',
    ninosEnCasa: '',
    razonAdopcion: ''
  };

  imagen1: File | null = null;
  imagen2: File | null = null;
  imagen3: File | null = null;

  constructor(private hogarService: HogarService) {}

  onFileSelected(event: any, index: number): void {
    const file = event.target.files[0];
    if (index === 1) this.imagen1 = file;
    if (index === 2) this.imagen2 = file;
    if (index === 3) this.imagen3 = file;
  }

  onSubmit(): void {
    const form = new FormData();

    // Añadir campos del DTO
    for (const key in this.formData) {
      form.append(key, this.formData[key]);
    }

    // Añadir imágenes
    if (this.imagen1) form.append('imagen1', this.imagen1);
    if (this.imagen2) form.append('imagen2', this.imagen2);
    if (this.imagen3) form.append('imagen3', this.imagen3);

    this.hogarService.registrarHogar(form).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Hogar registrado',
          text: 'El hogar ha sido registrado exitosamente.',
          confirmButtonText: 'Aceptar'
        });

        // Reiniciar formulario
        this.formData = {
          nombrePropietario: '',
          email: '',
          nombreHogar: '',
          telefono: '',
          direccion: '',
          localidad: '',
          tipoVivienda: '',
          tamanoVivienda: '',
          espacioExterior: '',
          otrosAnimales: '',
          ninosEnCasa: '',
          razonAdopcion: ''
        };

        this.imagen1 = null;
        this.imagen2 = null;
        this.imagen3 = null;
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al registrar el hogar.',
        });
      }
    });
  }
}
