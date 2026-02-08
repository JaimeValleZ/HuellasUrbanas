package com.huellas_urbanas.service.impl;

import com.huellas_urbanas.dto.DetalleCampanaDTO;
import com.huellas_urbanas.dto.ListarCampanasDTO;
import com.huellas_urbanas.dto.RegistrarCampanaDTO;
import com.huellas_urbanas.entities.Campana;
import com.huellas_urbanas.repository.ICampanaRepository;
import com.huellas_urbanas.service.ICampanaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CampanaServiceImpl implements ICampanaService {

  @Autowired
  private ICampanaRepository campanaRepository;

  @Override
  public DetalleCampanaDTO guardarCampana(RegistrarCampanaDTO registrar) {
    var campana = new Campana(null, registrar.nombre(), registrar.descripcion(), registrar.fechaInicio(),
      registrar.fechaFin(), registrar.localidad(), registrar.ubicacion(), registrar.imagenUrl());
    var saved = campanaRepository.save(campana);
    return new DetalleCampanaDTO(saved);
  }

  @Override
  public Page<ListarCampanasDTO> listarCampanas(Pageable pageable) {
    return campanaRepository.findAll(pageable).map(ListarCampanasDTO::new);
  }

    @Override
    public DetalleCampanaDTO verCampana(Long id) {
        return campanaRepository.findById(id).map(DetalleCampanaDTO::new).orElse(null);
    }

}
