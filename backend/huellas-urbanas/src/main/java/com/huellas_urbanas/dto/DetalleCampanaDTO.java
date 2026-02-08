package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.Campana;

import java.time.LocalDateTime;

public record DetalleCampanaDTO(
  Long id,
  String nombre,
  String descripcion,
  LocalDateTime fechaInicio,
  LocalDateTime fechaFin,
  String localidad,
  String ubicacion,
  String imagenUrl
) {
  public DetalleCampanaDTO(Campana campana) {
    this(campana.getId(),campana.getNombre(), campana.getDescripcion(), campana.getFechaInicio(), campana.getFechaFin(), campana.getLocalidad(), campana.getUbicacion(), campana.getImagenUrl());
  }
}
