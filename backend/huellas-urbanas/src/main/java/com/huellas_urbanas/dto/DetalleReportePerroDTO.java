package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.EstadoPerro;
import com.huellas_urbanas.entities.ReportePerro;

import java.time.LocalDateTime;

public record DetalleReportePerroDTO(
  Long id,
  Double latitud,
  Double longitud,
  String direccion,
  String descripcion,
  String imagenUrl,
  LocalDateTime fechaReporte,
  EstadoPerro estado

) {
  public DetalleReportePerroDTO(ReportePerro reportePerro) {
    this(reportePerro.getId(), reportePerro.getLatitud(), reportePerro.getLongitud(),
      reportePerro.getDireccion(), reportePerro.getDescripcion(), reportePerro.getImagenUrl(), reportePerro.getFechaReporte(), reportePerro.getEstado());
  }
}
