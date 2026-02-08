package com.huellas_urbanas.controller;

import com.huellas_urbanas.dto.ListarCampanasDTO;
import com.huellas_urbanas.dto.RegistrarCampanaDTO;
import com.huellas_urbanas.service.ICampanaService;
import com.huellas_urbanas.service.impl.AlmacenamientoService;
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

import java.time.LocalDateTime;

@RestController
@RequestMapping("/campanas")
@CrossOrigin("*")
public class CampanaController {

  @Autowired
  private ICampanaService campanaService;
  @Autowired
  private AlmacenamientoService almacenamientoService;

  @PostMapping(consumes = {"multipart/form-data"})
  @Transactional
  public ResponseEntity<?> guardarCampana(
    @Valid
    @RequestParam("nombre") String nombre,
    @RequestParam("descripcion") String descripcion,
    @RequestParam("fechaInicio") String fechaInicio,
    @RequestParam("fechaFin") String fechaFin,
    @RequestParam("localidad") String localidad,
    @RequestParam("ubicacion") String ubicacion,
    @RequestParam(value = "imagen", required = false) MultipartFile imagen) {

    try {
      // Guardar imagen (si se envía)
      String imagenUrl = null;
      if (imagen != null && !imagen.isEmpty()) {
        imagenUrl = almacenamientoService.guardarImagen(imagen);
      }

      var dto = new RegistrarCampanaDTO(
        nombre,
        descripcion,
        LocalDateTime.parse(fechaInicio),
        LocalDateTime.parse(fechaFin),
        localidad,
        ubicacion,
        imagenUrl
      );

      var campana = campanaService.guardarCampana(dto);
      return ResponseEntity.ok(campana);

    } catch (Exception e) {
      return ResponseEntity.badRequest().body("Error al guardar la campaña: " + e.getMessage());
    }
  }

  @GetMapping
  public ResponseEntity<Page<ListarCampanasDTO>> listarCampanas(@PageableDefault(size = 10, sort = {"fechaInicio"},
    direction = Sort.Direction.DESC) Pageable pageable){
    var page = campanaService.listarCampanas(pageable);
    return ResponseEntity.ok(page);
  }

  @GetMapping("/campana/{id}")
    public ResponseEntity verCampana(@PathVariable Long id){
        return ResponseEntity.ok(campanaService.verCampana(id));
    }

}
