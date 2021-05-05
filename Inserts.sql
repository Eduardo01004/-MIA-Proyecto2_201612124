CREATE OR REPLACE PROCEDURE InsertUser (username in VARCHAR2, contra VARCHAR2, nameu in VARCHAR2,  apellido in VARCHAR2, tiers in integer,fecha_nac in varchar2,fechaReg in varchar2,correo in varchar2,foto in varchar2,tipo in integer)
AS
BEGIN
    INSERT INTO Usuario (username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo)
    VALUES (username,contra,nameu,apellido,tiers,fecha_nac,fechaReg,correo,foto,tipo);
END;