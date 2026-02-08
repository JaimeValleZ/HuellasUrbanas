package com.huellas_urbanas.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity(name = "Campana")
@Table(name = "campanas")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Campana {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String nombre;
  private String descripcion;
  private LocalDateTime fechaInicio;
  private LocalDateTime fechaFin;
  private String localidad;
  private String ubicacion;
  private String imagenUrl;
}
