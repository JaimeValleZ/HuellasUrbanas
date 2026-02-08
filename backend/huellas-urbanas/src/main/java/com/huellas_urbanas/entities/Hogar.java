package com.huellas_urbanas.entities;


import jakarta.persistence.*;
import lombok.*;

@Entity(name = "Hogar")
@Table(name = "hogares")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Hogar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_propietario")
    private String nombrePropietario;

    private String email;

    @Column(name = "nombre_hogar")
    private String nombreHogar;

    private String telefono;
    private String direccion;

    @Column(name = "tipo_vivienda")
    private String tipoVivienda;

    @Column(name = "tamano_vivienda")
    private Double tamanoVivienda;

    @Column(name = "espacio_exterior")
    private String espacioExterior;

    @Column(name = "otros_animales")
    private String otrosAnimales;

    @Column(name = "ninos_en_casa")
    private String ninosEnCasa;

    @Column(name = "razon_adopcion")
    private String razonAdopcion;

    @Column(name = "imagen_url1")
    private String imagenUrl1;

    @Column(name = "imagen_url2")
    private String imagenUrl2;

    @Column(name = "imagen_url3")
    private String imagenUrl3;

    private String localidad;

    @Enumerated(EnumType.STRING)
    private EstadoHogar estado;

}
