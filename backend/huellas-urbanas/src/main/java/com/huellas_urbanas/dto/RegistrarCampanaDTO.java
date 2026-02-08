package com.huellas_urbanas.dto;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;


import java.time.LocalDateTime;

public record RegistrarCampanaDTO(
  @NotBlank String nombre,
  @NotBlank String descripcion,
  @NotNull @Future LocalDateTime fechaInicio,
  @NotNull @Future LocalDateTime fechaFin,
  @NotBlank String localidad,
  @NotBlank String ubicacion,
  String imagenUrl) {
}
