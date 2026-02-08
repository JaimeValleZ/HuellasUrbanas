package com.huellas_urbanas.controller;

import com.huellas_urbanas.dto.DetalleReportePerroDTO;
import com.huellas_urbanas.dto.ListarReportesPerrosDTO;
import com.huellas_urbanas.dto.RegistrarReportePerroDTO;
import com.huellas_urbanas.service.IReportePerroService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("reporte-perro")
@CrossOrigin("*")
public class ReportePerroController {

  @Autowired
  private IReportePerroService reportePerroService;


  @Transactional
  @PostMapping(consumes = {"multipart/form-data"})
  public ResponseEntity<DetalleReportePerroDTO> guardarReporte(
    @RequestPart("reporte") @Valid RegistrarReportePerroDTO registrar,
    @RequestPart(value = "imagen", required = false) MultipartFile imagen) {

    var detalle = reportePerroService.guardarReporte(registrar, imagen);
    return ResponseEntity.ok(detalle);
  }

  @GetMapping
  public ResponseEntity<Page<ListarReportesPerrosDTO>> listarReportes(@PageableDefault(size = 10, sort = {"fechaReporte"},
    direction = Sort.Direction.DESC) Pageable pageable){
    var page = reportePerroService.listarReportes(pageable);
    return ResponseEntity.ok(page);
  }

  @GetMapping("/ver/{id}")
    public ResponseEntity<DetalleReportePerroDTO> verReporte(@PathVariable Long id){
      var detalle = reportePerroService.verReporte(id);
        return ResponseEntity.ok(detalle);
  }


}
