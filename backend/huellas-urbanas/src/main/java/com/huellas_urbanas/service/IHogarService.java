package com.huellas_urbanas.service;

import com.huellas_urbanas.dto.DetalleHogarDTO;
import com.huellas_urbanas.dto.ListarHogaresDTO;
import com.huellas_urbanas.dto.RegistrarHogarDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface IHogarService {

    DetalleHogarDTO registrarHogar(RegistrarHogarDTO registrar,  MultipartFile imagen1, MultipartFile imagen2, MultipartFile imagen3);

    Page<ListarHogaresDTO> listarHogares(Pageable pageable);

    DetalleHogarDTO verHogar(Long id);
}
