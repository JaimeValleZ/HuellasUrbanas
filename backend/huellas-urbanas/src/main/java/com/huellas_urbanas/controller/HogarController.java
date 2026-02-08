package com.huellas_urbanas.controller;

import com.huellas_urbanas.dto.DetalleHogarDTO;
import com.huellas_urbanas.dto.ListarHogaresDTO;
import com.huellas_urbanas.dto.RegistrarHogarDTO;
import com.huellas_urbanas.service.IHogarService;
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
@RequestMapping("/hogares")
@CrossOrigin(origins = "*")
public class HogarController {

    @Autowired
    private IHogarService hogarService;

    @PostMapping(consumes = {"multipart/form-data"})
    @Transactional
    public ResponseEntity<DetalleHogarDTO> registrarHogar(
            @ModelAttribute @Valid RegistrarHogarDTO registrar,
            @RequestParam(value = "imagen1", required = false) MultipartFile imagen1,
            @RequestParam(value = "imagen2", required = false) MultipartFile imagen2,
            @RequestParam(value = "imagen3", required = false) MultipartFile imagen3) {

        DetalleHogarDTO respuesta = hogarService.registrarHogar(registrar, imagen1, imagen2, imagen3);
        return ResponseEntity.ok(respuesta);
    }

    @GetMapping
    public ResponseEntity<Page<ListarHogaresDTO>> listarHogares(@PageableDefault(size = 10, sort = {"id"},
            direction = Sort.Direction.DESC) Pageable pageable){
        var page = hogarService.listarHogares(pageable);
        return ResponseEntity.ok(page);
    }

    @GetMapping("/hogar/{id}")
    public ResponseEntity verHogar(@PathVariable Long id){
        return ResponseEntity.ok(hogarService.verHogar(id));
    }

}
