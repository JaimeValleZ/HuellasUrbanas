package com.huellas_urbanas.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class AlmacenamientoService {

  private final Path directorio = Paths.get("uploads");

  public String guardarImagen(MultipartFile file) throws IOException {
    if (!Files.exists(directorio)) {
      Files.createDirectories(directorio);
    }

    String nombreArchivo = UUID.randomUUID() + "_" + file.getOriginalFilename();
    Path destino = directorio.resolve(nombreArchivo);
    Files.copy(file.getInputStream(), destino);

    // Retornar ruta o URL relativa
    return "/uploads/" + nombreArchivo;
  }
}
