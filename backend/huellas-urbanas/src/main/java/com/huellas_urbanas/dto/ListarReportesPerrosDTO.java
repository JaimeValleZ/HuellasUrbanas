package com.huellas_urbanas.dto;

import com.huellas_urbanas.entities.EstadoPerro;
import com.huellas_urbanas.entities.ReportePerro;

import java.time.LocalDateTime;

public record ListarReportesPerrosDTO(
  Long id,
  String descripcion,
  Double latitud,
  Double longitud,
  String direccion,
  LocalDateTime fechaReporte,
  String imagenUrl,
  EstadoPerro estado
) {
  public ListarReportesPerrosDTO(ReportePerro reportePerro) {
    this(reportePerro.getId(), reportePerro.getDescripcion(), reportePerro.getLatitud(), reportePerro.getLongitud(),
      reportePerro.getDireccion(), reportePerro.getFechaReporte(), reportePerro.getImagenUrl(), reportePerro.getEstado());
  }
}
