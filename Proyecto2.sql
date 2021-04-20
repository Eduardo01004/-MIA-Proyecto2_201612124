
DROP table Usuario;

create table Usuario(
    id_usuario NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1),
    username varchar2(100),
    contra varchar2(100),
    nombre varchar2(100),
    apellido varchar2(100),
    tiers varchar2(100),
    fecha_naciemiento varchar2(100),
    fecha_registro varchar2(100),
    correo varchar2(100),
    foto  varchar2(100),
    CONSTRAINT Usuario_pk PRIMARY KEY(id_usuario)
);

select *from Usuario;
insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto) values('Eduardo19', 'caca1234', 'Eduardo', 'Tun', 'gold', '10/10/10', '5/15/15', 'eduardotun27@gmail.com', 'scasd');
