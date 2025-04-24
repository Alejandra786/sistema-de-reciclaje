CREATE SCHEMA IF NOT EXISTS sistema_reciclaje DEFAULT CHARACTER SET utf8mb4;
USE sistema_reciclaje;

CREATE TABLE IF NOT EXISTS usuarios (
  usuario_id INT AUTO_INCREMENT,
  nombre_completo VARCHAR(60) NOT NULL,
  correo VARCHAR(60) NOT NULL UNIQUE,
  contraseña_hash VARCHAR(60) NOT NULL,
  salt VARCHAR(32) NOT NULL,
  teléfono VARCHAR(20),
  fecha_eliminacion DATETIME,
  PRIMARY KEY (usuario_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS puntos_reciclajes (
  punto_id INT AUTO_INCREMENT,
  nombre VARCHAR(60) NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fin TIME NOT NULL,
  ubicación VARCHAR(100) NOT NULL,
  latitud DECIMAL(10,8) NOT NULL,
  longitud DECIMAL(10,8) NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (punto_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS reciclajes (
  reciclaje_id INT AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  punto_id INT NOT NULL,
  fecha DATE NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (reciclaje_id),
  INDEX (punto_id),
  INDEX (usuario_id),
  CONSTRAINT fk_reciclaje_punto FOREIGN KEY (punto_id)
    REFERENCES puntos_reciclajes (punto_id),
  CONSTRAINT fk_reciclaje_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS recompensas (
  recompensa_id INT AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripción VARCHAR(255) NOT NULL,
  puntos_necesarios INT NOT NULL,
  fecha_eliminacion DATETIME,  
  PRIMARY KEY (recompensa_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS canjes (
  canje_id INT AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  puntos_gastados INT NOT NULL,
  recompensa_id INT NOT NULL,
  fecha DATETIME NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (canje_id),
  INDEX (usuario_id),
  INDEX (recompensa_id),
  CONSTRAINT fk_canje_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id),
  CONSTRAINT fk_canje_recompensa FOREIGN KEY (recompensa_id)
    REFERENCES recompensas (recompensa_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS impactos_ambientales (
  impacto_id INT AUTO_INCREMENT,
  reciclaje_id INT NOT NULL,
  kg_reciclados DECIMAL(10,2) NOT NULL,
  CO2_reducidos DECIMAL(10,2) NOT NULL,
  fecha DATE NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (impacto_id),
  INDEX (reciclaje_id),
  CONSTRAINT fk_impacto_reciclaje FOREIGN KEY (reciclaje_id)
    REFERENCES reciclajes (reciclaje_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS descuentos (
  descuento_id INT AUTO_INCREMENT,
  recompensa_id INT NOT NULL,
  nombre VARCHAR(50) NOT NULL,
  porcentaje_descuento DECIMAL(5,2) NOT NULL,
  fecha_inicio DATETIME NOT NULL,
  fecha_fin DATETIME NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (descuento_id),
  INDEX (recompensa_id),
  CONSTRAINT fk_descuento_recompensa FOREIGN KEY (recompensa_id)
    REFERENCES recompensas (recompensa_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS roles (
  rol_id TINYINT UNSIGNED AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  descripción VARCHAR(255) NOT NULL,
  PRIMARY KEY (rol_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS puntajes (
  puntaje_id INT AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  puntos_gastados INT NOT NULL,
  puntos_ganados INT NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (puntaje_id),
  INDEX (usuario_id),
  CONSTRAINT fk_puntaje_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS usuario_roles (
  usuario_id INT NOT NULL,
  rol_id TINYINT UNSIGNED NOT NULL,
  fecha DATE NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (usuario_id, rol_id),
  INDEX (rol_id),
  CONSTRAINT fk_ur_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id),
  CONSTRAINT fk_ur_rol FOREIGN KEY (rol_id)
    REFERENCES roles (rol_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS tipos_materiales (
  tipo_material_id INT AUTO_INCREMENT,
  categoria VARCHAR(100) NOT NULL,
  puntos_kg DECIMAL(10,2) NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (tipo_material_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS listas_materiales (
  reciclaje_id INT NOT NULL,
  tipo_material_id INT NOT NULL,
  nombre_material VARCHAR(100) NOT NULL,
  cantidad_kg DECIMAL(10,2) NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (reciclaje_id, tipo_material_id),
  INDEX (reciclaje_id),
  INDEX (tipo_material_id),
  CONSTRAINT fk_lista_reciclaje FOREIGN KEY (reciclaje_id)
    REFERENCES reciclajes (reciclaje_id),
  CONSTRAINT fk_lista_material FOREIGN KEY (tipo_material_id)
    REFERENCES tipos_materiales (tipo_material_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS donaciones (
  donación_id INT AUTO_INCREMENT,
  usuario_id INT NOT NULL,
  monto DECIMAL(10,2),
  metodo_pago VARCHAR(50),
  fecha DATETIME NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (donación_id),
  INDEX (usuario_id),
  CONSTRAINT fk_donaciones_usuario FOREIGN KEY (usuario_id)
    REFERENCES usuarios (usuario_id)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS punto_tipos_materiales (
  punto_id INT NOT NULL,
  tipo_material_id INT NOT NULL,
  fecha_eliminacion DATETIME,
  PRIMARY KEY (punto_id, tipo_material_id),
  CONSTRAINT fk_pt_punto FOREIGN KEY (punto_id)
    REFERENCES puntos_reciclajes (punto_id),
  CONSTRAINT fk_pt_material FOREIGN KEY (tipo_material_id)
    REFERENCES tipos_materiales (tipo_material_id)
) ENGINE = InnoDB;