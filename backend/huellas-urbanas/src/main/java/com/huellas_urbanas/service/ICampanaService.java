package com.huellas_urbanas.service;

import com.huellas_urbanas.dto.DetalleCampanaDTO;
import com.huellas_urbanas.dto.ListarCampanasDTO;
import com.huellas_urbanas.dto.RegistrarCampanaDTO;
import com.huellas_urbanas.entities.Campana;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICampanaService {

  DetalleCampanaDTO guardarCampana(RegistrarCampanaDTO registrar);

  Page<ListarCampanasDTO> listarCampanas(Pageable pageable);

  DetalleCampanaDTO verCampana(Long id);


}
