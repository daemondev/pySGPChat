--https://docs.oracle.com/cd/B28359_01/appdev.111/b28370/packages.htm#LNPLS009
--https://asktom.oracle.com/pls/apex/asktom.search?tag=cursors-in-package-spec
--http://www.oracle.com/technetwork/issue-archive/2013/13-mar/o23plsql-1906474.html
create table perfil(
id int primary key,
nombre varchar(50),
descripcion varchar(50),
estado char(1) default 1 check(estado in(0,1)),
ins timestamp default current_timestamp
);
commit;

create sequence SQ_PERFIL_IDENTITY start with 1;
commit;

create or replace trigger TR_PERFIL_IDENTITY before insert on perfil for each row
begin
select SQ_PERFIL_IDENTITY.NEXTVAL into :new.id from dual;
end;
commit;

insert into perfil(nombre, descripcion) values('ADMINISTRADOR', 'Administrador General');
insert into perfil(nombre, descripcion) values('GERENTE', 'GERENTE General');
commit;

create table usuario(
id int primary key,
nombre varchar(50),
apPat varchar(50),
apMat varchar(50),
sueldo decimal(6,2),
estado char(1) default 1 check(estado in (0,1)),
ins timestamp default current_timestamp
);
commit;
alter table usuario add idPerfil int ;
alter table usuario add constraint FK_Usuario_Perfil foreign key (idPerfil) references perfil(id);

create sequence SQ_USUARIO_IDENTITY start with 1;
commit;

create or replace trigger TR_USUARIO_IDENTITY
before insert on usuario 
for each row
begin
    select SQ_USUARIO_IDENTITY.NEXTVAL into :new.id from dual;
end;
commit;

insert into usuario(nombre, apPat, apMat, sueldo) values('Eidan Liam', 'Muñico', 'Villaverde', 4500);
insert into usuario(nombre, apPat, apMat, sueldo) values('Alizee Celine', 'Muñico', 'Villaverde', 5000);
commit;

select * from usuario;

create or replace package t as
type c is ref cursor;
end;
commit;

create or replace procedure getUsuarios(pCur out t.c)
as
begin
open pCur for
select ID ,
NOMBRE ,
APPAT ,
APMAT ,
SUELDO ,
ESTADO ,
INS  from usuario;
end;
commit;

drop procedure insUsuario;
commit;

create or replace procedure insUsuario(pCur out t.c, pId in usuario.id%TYPE, pNom in usuario.nombre%TYPE, pApPat in usuario.apPat%TYPE, pApMat in usuario.apMat%TYPE, pSueldo in usuario.sueldo%TYPE, pIdPerfil in usuario.idPerfil%TYPE)
as
begin
    if pId <> 0 then
        update usuario set nombre = pNom, apPat = pApPat, apMat = pApMat, sueldo = pSueldo, idPerfil = pIdPerfil where id = pId;    
    else
        insert into usuario(nombre, apPat, apMat, sueldo) values(pNom, pApPat, pApMat, pSueldo, pIdPerfil);
    end if;
end;
commit;

--execute insUsuario('Richar Santiago','Muñico','Samaniego',5000);
