CREATE TABLE campanas (
                        id BIGINT AUTO_INCREMENT NOT NULL,
                        nombre VARCHAR(100) NOT NULL,
                        descripcion VARCHAR(255),
                        fecha_inicio DATETIME,
                        fecha_fin DATETIME,
                        localidad VARCHAR(100),
                        ubicacion VARCHAR(255),
                        imagen_url VARCHAR(255),
                        PRIMARY KEY(id)
);
