drop table Membresia;
DROP table Usuario;
drop table jornada;
drop table Evento;
drop table Prediccion;
drop table Temporada;
drop table Puntaje;
drop table Recompensa;

create table Usuario(
    id_usuario integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    username varchar2(100) unique not null,
    contra varchar2(100) not null,
    nombre varchar2(100),
    apellido varchar2(100),
    tiers integer,
    fecha_naciemiento varchar2(100),
    fecha_registro varchar2(100),
    correo varchar2(100),
    foto  varchar2(255),
    tipo integer,
    CONSTRAINT Usuario_pk PRIMARY KEY(id_usuario)
);

create table Jornada(
    id_jornada  integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    fase varchar2(100),
    CONSTRAINT Jornada_pk PRIMARY KEY(id_jornada)
);

create table Evento(drop table
    id_evento integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    tipo varchar2(100),
    id_jornada integer not null,
    CONSTRAINT Evento_pk PRIMARY KEY(id_evento),
    FOREIGN KEY (id_jornada) REFERENCES Jornada(id_jornada)
    
);
create table Prediccion(
    id_prediccion  integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    tipo varchar2(100),
    id_evento integer not null,
    id_usuario integer not null,
    CONSTRAINT Prediccion_pk PRIMARY KEY(id_prediccion),
    FOREIGN KEY (id_evento) REFERENCES Evento(id_evento),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
    
);

create table Temporada(
    id_temporada integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    CONSTRAINT Temporada_pk PRIMARY KEY(id_Temporada)
);

create table Puntaje(
    id_puntaje  integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    puntos integer,
    id_temporada integer not null,
    constraint Puntaje_pk primary key (id_puntaje),
    FOREIGN KEY (id_temporada) REFERENCES Temporada(id_temporada)

);

create table Recompensa(
    id_recompensa  integer GENERATED BY DEFAULT ON NULL AS IDENTITY (START WITH 1 INCREMENT BY 1),
    total integer,
    id_usuario integer not null,
    id_temporada integer not null,
    constraint Recompensa_pk primary key (id_recompensa),
    FOREIGN KEY (id_temporada) REFERENCES Temporada(id_temporada),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

select *from Usuario;
select *from Usuario where username = 'Eduardo21';
insert into Usuario(username,contra,tipo) values('admin','admin',2);
insert into Usuario(username,contra,nombre,apellido,tiers,fecha_naciemiento,fecha_registro,correo,foto,tipo) values('Eduardo19', 'caca1234', 'Eduardo', 'Tun', '3', '10/10/10', '5/15/15', 'eduardotun27@gmail.com', 'scasd','1');
