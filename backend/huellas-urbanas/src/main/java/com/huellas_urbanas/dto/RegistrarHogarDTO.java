package com.huellas_urbanas.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegistrarHogarDTO(
        @NotBlank String nombrePropietario,
        @NotBlank @Email String email,
        String nombreHogar,
        @NotBlank String telefono,
        @NotBlank String direccion,
        @NotBlank String localidad,
        @NotBlank String tipoVivienda,
        @NotNull Double tamanoVivienda,
        @NotBlank String espacioExterior,
        @NotBlank String otrosAnimales,
        @NotBlank String ninosEnCasa,
        @NotBlank String razonAdopcion,
        String imagenUrl1,
        String imagenUrl2,
        String imagenUrl3
) {
}
