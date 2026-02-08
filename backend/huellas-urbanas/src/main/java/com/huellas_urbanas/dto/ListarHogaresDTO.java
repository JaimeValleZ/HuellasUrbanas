package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.EstadoHogar;
import com.huellas_urbanas.entities.Hogar;
import jakarta.validation.constraints.NotBlank;

public record ListarHogaresDTO(
        Long id,
        String nombrePropietario,
        String nombreHogar,
        String telefono,
        String localidad,
        EstadoHogar estado,
        String imagenUrl1
) {

    public ListarHogaresDTO(Hogar hogar) {
        this(hogar.getId(), hogar.getNombrePropietario(), hogar.getNombreHogar(), hogar.getTelefono(), hogar.getLocalidad(), hogar.getEstado(), hogar.getImagenUrl1());
    }
}
