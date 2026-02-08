package com.huellas_urbanas.entities;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity(name = "ReportePerro")
@Table(name = "reportes_perros")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class ReportePerro {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String descripcion;

  private double latitud;
  private double longitud;

  private String direccion; // opcional, por si se quiere guardar el texto

  private String imagenUrl;

  private LocalDateTime fechaReporte;

  @Enumerated(EnumType.STRING)
  private EstadoPerro estado;

  @PrePersist
  public void prePersist() {
    fechaReporte = LocalDateTime.now();
  }
}
