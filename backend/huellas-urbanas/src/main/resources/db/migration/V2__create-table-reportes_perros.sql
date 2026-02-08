CREATE TABLE reportes_perros (
                               id BIGINT AUTO_INCREMENT,
                               descripcion VARCHAR(255) NOT NULL,
                               latitud DOUBLE NOT NULL,
                               longitud DOUBLE NOT NULL,
                               direccion VARCHAR(255),
                               imagen_url VARCHAR(255),
                               fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
                               primary key (id)
);
