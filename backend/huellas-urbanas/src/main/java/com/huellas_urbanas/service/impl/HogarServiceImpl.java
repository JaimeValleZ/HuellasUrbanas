package com.huellas_urbanas.service.impl;

import com.huellas_urbanas.dto.DetalleHogarDTO;
import com.huellas_urbanas.dto.ListarHogaresDTO;
import com.huellas_urbanas.dto.RegistrarHogarDTO;
import com.huellas_urbanas.entities.EstadoHogar;
import com.huellas_urbanas.entities.Hogar;
import com.huellas_urbanas.repository.IHogarRepository;
import com.huellas_urbanas.service.IHogarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class HogarServiceImpl implements IHogarService {

    @Autowired
    private IHogarRepository hogarRepository;

    @Autowired
    private AlmacenamientoService almacenamientoService;

    @Override
    public DetalleHogarDTO registrarHogar(RegistrarHogarDTO registrar, MultipartFile imagenUrl1, MultipartFile imagenUrl2, MultipartFile imagenUrl3) {
        try {
            String url1 = null;
            String url2 = null;
            String url3 = null;

            if (imagenUrl1 != null && !imagenUrl1.isEmpty()) {
                url1 = almacenamientoService.guardarImagen(imagenUrl1);
            }
            if (imagenUrl2 != null && !imagenUrl2.isEmpty()) {
                url2 = almacenamientoService.guardarImagen(imagenUrl2);
            }
            if (imagenUrl3 != null && !imagenUrl3.isEmpty()) {
                url3 = almacenamientoService.guardarImagen(imagenUrl3);
            }

            Hogar hogar = new Hogar(null, registrar.nombrePropietario(), registrar.email(), registrar.nombreHogar(), registrar.telefono(),
                    registrar.direccion(), registrar.tipoVivienda(), registrar.tamanoVivienda(), registrar.espacioExterior(),
                    registrar.otrosAnimales(), registrar.ninosEnCasa(), registrar.razonAdopcion(),url1, url2, url3,  registrar.localidad(), EstadoHogar.EN_REVISION);

            var guardado = hogarRepository.save(hogar);
            return new DetalleHogarDTO(guardado);

        } catch (Exception e) {
            throw new RuntimeException("Error al registrar el hogar: " + e.getMessage());
        }
    }

    @Override
    public Page<ListarHogaresDTO> listarHogares(Pageable pageable) {
        return hogarRepository.findAll(pageable).map(ListarHogaresDTO::new);
    }

    @Override
    public DetalleHogarDTO verHogar(Long id) {
        return hogarRepository.findById(id).map(DetalleHogarDTO::new).orElse(null);
    }
}
