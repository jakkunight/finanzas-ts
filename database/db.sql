CREATE DATABASE finanzas_ts;
USE finanzas_ts;

CREATE TABLE categorias(
	id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre TEXT NOT NULL DEFAULT("N/A"),
	descripcion TEXT NOT NULL DEFAULT("N/A")
);
CREATE TABLE niveles(
	id INT(5) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre TEXT NOT NULL DEFAULT("N/A"),
	descripcion TEXT NOT NULL DEFAULT("N/A")
);
CREATE TABLE usuarios(
	id INT(4) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nombre TEXT NOT NULL DEFAULT("N/A"),
	email TEXT NOT NULL DEFAULT("ejemplo@ejemplo.ejemplo"),
	password TEXT NOT NULL
);
CREATE TABLE gastos(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	usuario INT(4) NOT NULL DEFAULT(0),
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE),
	monto FLOAT(13, 2) NOT NULL DEFAULT(0.00),
	categoria INT(5) NOT NULL DEFAULT(0)
);
CREATE TABLE ingresos(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	usuario INT(4) NOT NULL DEFAULT(0),
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE),
	monto FLOAT(13, 2) NOT NULL DEFAULT(0.00),
	categoria INT(5) NOT NULL DEFAULT(0)
);
CREATE TABLE presupuestos_gastos(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	usuario INT(4) NOT NULL DEFAULT(0),
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE),
	monto FLOAT(13, 2) NOT NULL DEFAULT(0.00),
	categoria INT(5) NOT NULL DEFAULT(0),
	nivel INT(5) NOT NULL DEFAULT(0)
);
CREATE TABLE presupuestos_ingresos(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	usuario INT(4) NOT NULL DEFAULT(0),
	fecha DATE NOT NULL DEFAULT(CURRENT_DATE),
	monto FLOAT(13, 2) NOT NULL DEFAULT(0.00),
	categoria INT(5) NOT NULL DEFAULT(0),
	nivel INT(5) NOT NULL DEFAULT(0)
);
