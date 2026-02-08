package com.huellas_urbanas.service.impl;

import com.huellas_urbanas.dto.DetalleReportePerroDTO;
import com.huellas_urbanas.dto.ListarReportesPerrosDTO;
import com.huellas_urbanas.dto.RegistrarReportePerroDTO;
import com.huellas_urbanas.entities.ReportePerro;
import com.huellas_urbanas.repository.IReportePerroRepository;
import com.huellas_urbanas.service.IReportePerroService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ReportePerroServiceImpl implements IReportePerroService {

  @Autowired
  private IReportePerroRepository reportePerroRepository;

  @Autowired
  private AlmacenamientoService almacenamientoService;

  @Override
  public DetalleReportePerroDTO guardarReporte(RegistrarReportePerroDTO registrar, MultipartFile imagen) {
    String imagenUrl = null;

    try {
      if (imagen != null && !imagen.isEmpty()) {
        imagenUrl = almacenamientoService.guardarImagen(imagen);
      }
    } catch (IOException e) {
      throw new RuntimeException("Error al guardar la imagen", e);
    }

    var reportePerro = new ReportePerro(
      null,
      registrar.descripcion(),
      registrar.latitud(),
      registrar.longitud(),
      registrar.direccion(),
      imagenUrl,
      LocalDateTime.now(),
      registrar.estado()
    );

    reportePerroRepository.save(reportePerro);
    return new DetalleReportePerroDTO(reportePerro);
  }

  @Override
  public Page<ListarReportesPerrosDTO> listarReportes(Pageable pageable) {
    return reportePerroRepository.findAll(pageable).map(ListarReportesPerrosDTO::new);
  }

    @Override
    public DetalleReportePerroDTO verReporte(Long id) {
        return reportePerroRepository.findById(id).map(DetalleReportePerroDTO::new).orElse(null);
    }
}
