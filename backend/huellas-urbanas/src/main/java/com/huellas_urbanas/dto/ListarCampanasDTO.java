package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.Campana;

public record ListarCampanasDTO(
  Long id,
  String nombre,
  String descripcion,
  String imagenUrl
) {

  public ListarCampanasDTO(Campana campana) {
    this(campana.getId(), campana.getNombre(), campana.getDescripcion(), campana.getImagenUrl());
  }
}
