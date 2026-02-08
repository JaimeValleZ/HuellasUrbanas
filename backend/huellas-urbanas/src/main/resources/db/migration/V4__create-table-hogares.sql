CREATE TABLE hogares (
                         id BIGINT AUTO_INCREMENT,
                         nombre_propietario VARCHAR(255) NOT NULL,
                         email VARCHAR(255) NOT NULL,
                         nombre_hogar VARCHAR(255),
                         telefono VARCHAR(50) NOT NULL,
                         direccion VARCHAR(255) NOT NULL,
                         tipo_vivienda VARCHAR(100) NOT NULL,
                         tamano_vivienda DOUBLE NOT NULL,
                         espacio_exterior VARCHAR(100) NOT NULL,
                         otros_animales VARCHAR(255) NOT NULL,
                         ninos_en_casa VARCHAR(100) NOT NULL,
                         razon_adopcion VARCHAR(500) NOT NULL,
                         imagen_url1 VARCHAR(255) NOT NULL,
                         imagen_url2 VARCHAR(255),
                         imagen_url3 VARCHAR(255),
    PRIMARY KEY (id)
);
