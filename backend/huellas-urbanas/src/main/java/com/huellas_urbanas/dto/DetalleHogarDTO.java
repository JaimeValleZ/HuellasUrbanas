package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.EstadoHogar;
import com.huellas_urbanas.entities.Hogar;


public record DetalleHogarDTO(
        Long id,
        String nombrePropietario,
        String email,
        String nombreHogar,
        String telefono,
        String direccion,
        String localidad,
        String tipoVivienda,
        Double tamanoVivienda,
        String espacioExterior,
        String otrosAnimales,
        String ninosEnCasa,
        String razonAdopcion,
        EstadoHogar estado,
        String imagenUrl1,
        String imagenUrl2,
        String imagenUrl3
) {

    public DetalleHogarDTO(Hogar hogar) {
        this(hogar.getId(), hogar.getNombrePropietario(), hogar.getEmail(), hogar.getNombreHogar(), hogar.getTelefono(),
                hogar.getDireccion(), hogar.getLocalidad(), hogar.getTipoVivienda(), hogar.getTamanoVivienda(), hogar.getEspacioExterior(),
                hogar.getOtrosAnimales(), hogar.getNinosEnCasa(), hogar.getRazonAdopcion(), hogar.getEstado(), hogar.getImagenUrl1(), hogar.getImagenUrl2(), hogar.getImagenUrl3());
    }
}
