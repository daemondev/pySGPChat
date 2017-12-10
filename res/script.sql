--drop table tChat
create table tChat(
id int primary key identity,
userIDSRC int foreign key references TB_USUARIO (in_usuarioID),
userIDDST int foreign key references TB_USUARIO (in_usuarioID),
[message] varchar(max) default '',
ins datetime default getdate(),
--constraint FK_TB_USUARIO foreign key(userID) references TB_USUARIO (in_usuarioID),
)
truncate table tChat
select * from tChat;
select * from TB_USUARIO

insert into tChat(userIDSRC, userIDDST, message) values (1, 1, 'xxx')