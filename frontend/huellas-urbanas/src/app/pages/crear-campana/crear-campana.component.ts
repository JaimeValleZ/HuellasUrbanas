import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampanasService } from '../../services/campanas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-campana',
  templateUrl: './crear-campana.component.html',
  styleUrls: ['./crear-campana.component.css']
})
export class CrearCampanaComponent {
  campanaForm: FormGroup;
  imagenFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder, private campanaService: CampanasService) {
    this.campanaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      localidad: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.imagenFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(this.imagenFile);
    }
  }

  onSubmit(): void {
    if (this.campanaForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor completa todos los campos obligatorios.',
      });
      return;
    }

    const formValues = this.campanaForm.value;

    const fechaInicio = formValues.fechaInicio.toString();
    const fechaFin = formValues.fechaFin.toString();

    const formData = new FormData();
    formData.append('nombre', formValues.nombre);
    formData.append('descripcion', formValues.descripcion);
    formData.append('fechaInicio', fechaInicio);
    formData.append('fechaFin', fechaFin);
    formData.append('localidad', formValues.localidad);
    formData.append('ubicacion', formValues.ubicacion);

    if (this.imagenFile) {
      formData.append('imagen', this.imagenFile);
    }

    this.campanaService.crearCampana(formData).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Campaña creada',
          text: 'La campaña se ha creado correctamente.',
          confirmButtonText: 'Aceptar'
        });

        this.campanaForm.reset();
        this.previewUrl = null;
        this.imagenFile = null;
      },
      error: (err) => {
        console.error('Error al crear la campaña:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al crear campaña',
          text: err?.message || 'Ocurrió un error durante el registro.',
        });
      }
    });
  }
}
