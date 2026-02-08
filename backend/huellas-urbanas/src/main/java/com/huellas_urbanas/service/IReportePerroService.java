package com.huellas_urbanas.service;

import com.huellas_urbanas.dto.DetalleReportePerroDTO;
import com.huellas_urbanas.dto.ListarReportesPerrosDTO;
import com.huellas_urbanas.dto.RegistrarReportePerroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IReportePerroService {

  DetalleReportePerroDTO guardarReporte(RegistrarReportePerroDTO registrar, MultipartFile imagen);

  Page<ListarReportesPerrosDTO> listarReportes(Pageable pageable);

  DetalleReportePerroDTO verReporte(Long id);
}
