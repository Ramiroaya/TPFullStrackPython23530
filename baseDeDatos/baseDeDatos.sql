
-- Creacion de Base de Datos "cryptoMercado"

create database if not exists cryptoMercado;
use cryptoMercado;

-- Creacion de la Entidad "Usuario"

create table usuario(
	idUsuario int primary key auto_increment,
    nombre varchar(255) not null,
    ciudad varchar(255) not null,
    email varchar(255) not null,
	contraseña varchar(255) not null
    );