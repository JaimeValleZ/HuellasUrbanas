package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.EstadoPerro;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record RegistrarReportePerroDTO(
  @NotBlank String descripcion,
  @NotNull Double latitud,
  @NotNull Double longitud,
  String direccion,
  String imagenUrl,
  EstadoPerro estado

) {
}
