/****** Generando el script de la configuración de replicación. Fecha del script: 10/08/2017 9:31:50 ******/
/****** Tenga en cuenta que, por motivos de seguridad, se asignó el valor Null o una cadena vacía a todos los parámetros de contraseña. ******/

/****** Instalando el servidor como distribuidor. Fecha del script: 10/08/2017 9:31:50 ******/
use master
exec sp_adddistributor @distributor = N'IT_DESARROLLO03', @password = N''
GO
exec sp_adddistributiondb @database = N'distribution', @data_folder = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\Data', @log_folder = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\Data', @log_file_size = 2, @min_distretention = 0, @max_distretention = 72, @history_retention = 48, @security_mode = 1
GO

use [distribution] 
if (not exists (select * from sysobjects where name = 'UIProperties' and type = 'U ')) 
	create table UIProperties(id int) 
if (exists (select * from ::fn_listextendedproperty('SnapshotFolder', 'user', 'dbo', 'table', 'UIProperties', null, null))) 
	EXEC sp_updateextendedproperty N'SnapshotFolder', N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\ReplData', 'user', dbo, 'table', 'UIProperties' 
else 
	EXEC sp_addextendedproperty N'SnapshotFolder', N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\ReplData', 'user', dbo, 'table', 'UIProperties'
GO

exec sp_adddistpublisher @publisher = N'IT_DESARROLLO03', @distribution_db = N'distribution', @security_mode = 1, @working_directory = N'C:\Program Files\Microsoft SQL Server\MSSQL10_50.MSSQLSERVER\MSSQL\ReplData', @trusted = N'false', @thirdparty_flag = 0, @publisher_type = N'MSSQLSERVER'
GO

use [MDY_MANAGER]
exec sp_replicationdboption @dbname = N'MDY_MANAGER', @optname = N'publish', @value = N'true'
GO
-- Agregando la publicación transaccional
use [MDY_MANAGER]
exec sp_addpublication @publication = N'MASTER_APP', @description = N'Publicación transaccional de la base de datos ''MDY_MANAGER'' del publicador ''IT_DESARROLLO03''.', @sync_method = N'concurrent', @retention = 0, @allow_push = N'true', @allow_pull = N'true', @allow_anonymous = N'true', @enabled_for_internet = N'false', @snapshot_in_defaultfolder = N'true', @compress_snapshot = N'false', @ftp_port = 21, @ftp_login = N'anonymous', @allow_subscription_copy = N'false', @add_to_active_directory = N'false', @repl_freq = N'continuous', @status = N'active', @independent_agent = N'true', @immediate_sync = N'true', @allow_sync_tran = N'false', @autogen_sync_procs = N'false', @allow_queued_tran = N'false', @allow_dts = N'false', @replicate_ddl = 1, @allow_initialize_from_backup = N'false', @enabled_for_p2p = N'false', @enabled_for_het_sub = N'false'
GO


exec sp_addpublication_snapshot @publication = N'MASTER_APP', @frequency_type = 1, @frequency_interval = 0, @frequency_relative_interval = 0, @frequency_recurrence_factor = 0, @frequency_subday = 0, @frequency_subday_interval = 0, @active_start_time_of_day = 0, @active_end_time_of_day = 235959, @active_start_date = 0, @active_end_date = 0, @job_login = null, @job_password = null, @publisher_security_mode = 1


use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'sysdiagrams', @source_owner = N'dbo', @source_object = N'sysdiagrams', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'sysdiagrams', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dbosysdiagrams', @del_cmd = N'CALL sp_MSdel_dbosysdiagrams', @upd_cmd = N'SCALL sp_MSupd_dbosysdiagrams'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_APLICATIVO', @source_owner = N'dbo', @source_object = N'TBL_APLICATIVO', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_APLICATIVO', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_APLICATIVO', @del_cmd = N'CALL sp_MSdel_dboTBL_APLICATIVO', @upd_cmd = N'SCALL sp_MSupd_dboTBL_APLICATIVO'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_APLICATIVO_CAMPANHA', @source_owner = N'dbo', @source_object = N'TBL_APLICATIVO_CAMPANHA', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_APLICATIVO_CAMPANHA', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_APLICATIVO_CAMPANHA', @del_cmd = N'CALL sp_MSdel_dboTBL_APLICATIVO_CAMPANHA', @upd_cmd = N'SCALL sp_MSupd_dboTBL_APLICATIVO_CAMPANHA'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_APLICATIVO_SEDE', @source_owner = N'dbo', @source_object = N'TBL_APLICATIVO_SEDE', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_APLICATIVO_SEDE', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_APLICATIVO_SEDE', @del_cmd = N'CALL sp_MSdel_dboTBL_APLICATIVO_SEDE', @upd_cmd = N'SCALL sp_MSupd_dboTBL_APLICATIVO_SEDE'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_BLACKLIST', @source_owner = N'dbo', @source_object = N'TBL_BLACKLIST', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_BLACKLIST', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_BLACKLIST', @del_cmd = N'CALL sp_MSdel_dboTBL_BLACKLIST', @upd_cmd = N'SCALL sp_MSupd_dboTBL_BLACKLIST'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_CAMPANHA', @source_owner = N'dbo', @source_object = N'TBL_CAMPANHA', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_CAMPANHA', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_CAMPANHA', @del_cmd = N'CALL sp_MSdel_dboTBL_CAMPANHA', @upd_cmd = N'SCALL sp_MSupd_dboTBL_CAMPANHA'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_CAMPANHA_SEDE', @source_owner = N'dbo', @source_object = N'TBL_CAMPANHA_SEDE', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_CAMPANHA_SEDE', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_CAMPANHA_SEDE', @del_cmd = N'CALL sp_MSdel_dboTBL_CAMPANHA_SEDE', @upd_cmd = N'SCALL sp_MSupd_dboTBL_CAMPANHA_SEDE'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_PAIS', @source_owner = N'dbo', @source_object = N'TBL_PAIS', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_PAIS', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_PAIS', @del_cmd = N'CALL sp_MSdel_dboTBL_PAIS', @upd_cmd = N'SCALL sp_MSupd_dboTBL_PAIS'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO', @source_owner = N'dbo', @source_object = N'TBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO', @del_cmd = N'CALL sp_MSdel_dboTBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO', @upd_cmd = N'SCALL sp_MSupd_dboTBL_PAIS_SEDE_CAMPANHA_PERFIL_APLICATIVO'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_PERFIL', @source_owner = N'dbo', @source_object = N'TBL_PERFIL', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_PERFIL', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_PERFIL', @del_cmd = N'CALL sp_MSdel_dboTBL_PERFIL', @upd_cmd = N'SCALL sp_MSupd_dboTBL_PERFIL'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_PERFIL_APLICATIVO', @source_owner = N'dbo', @source_object = N'TBL_PERFIL_APLICATIVO', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_PERFIL_APLICATIVO', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_PERFIL_APLICATIVO', @del_cmd = N'CALL sp_MSdel_dboTBL_PERFIL_APLICATIVO', @upd_cmd = N'SCALL sp_MSupd_dboTBL_PERFIL_APLICATIVO'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_SEDE', @source_owner = N'dbo', @source_object = N'TBL_SEDE', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_SEDE', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_SEDE', @del_cmd = N'CALL sp_MSdel_dboTBL_SEDE', @upd_cmd = N'SCALL sp_MSupd_dboTBL_SEDE'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_USUARIO', @source_owner = N'dbo', @source_object = N'TBL_USUARIO', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_USUARIO', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_USUARIO', @del_cmd = N'CALL sp_MSdel_dboTBL_USUARIO', @upd_cmd = N'SCALL sp_MSupd_dboTBL_USUARIO'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_USUARIO_APLICATIVO', @source_owner = N'dbo', @source_object = N'TBL_USUARIO_APLICATIVO', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_USUARIO_APLICATIVO', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_USUARIO_APLICATIVO', @del_cmd = N'CALL sp_MSdel_dboTBL_USUARIO_APLICATIVO', @upd_cmd = N'SCALL sp_MSupd_dboTBL_USUARIO_APLICATIVO'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_USUARIO_CAMPANHA', @source_owner = N'dbo', @source_object = N'TBL_USUARIO_CAMPANHA', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_USUARIO_CAMPANHA', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_USUARIO_CAMPANHA', @del_cmd = N'CALL sp_MSdel_dboTBL_USUARIO_CAMPANHA', @upd_cmd = N'SCALL sp_MSupd_dboTBL_USUARIO_CAMPANHA'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_USUARIO_PERFIL', @source_owner = N'dbo', @source_object = N'TBL_USUARIO_PERFIL', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_USUARIO_PERFIL', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_USUARIO_PERFIL', @del_cmd = N'CALL sp_MSdel_dboTBL_USUARIO_PERFIL', @upd_cmd = N'SCALL sp_MSupd_dboTBL_USUARIO_PERFIL'
GO




use [MDY_MANAGER]
exec sp_addarticle @publication = N'MASTER_APP', @article = N'TBL_USUARIO_SEDE', @source_owner = N'dbo', @source_object = N'TBL_USUARIO_SEDE', @type = N'logbased', @description = null, @creation_script = null, @pre_creation_cmd = N'drop', @schema_option = 0x000000000803509F, @identityrangemanagementoption = N'manual', @destination_table = N'TBL_USUARIO_SEDE', @destination_owner = N'dbo', @vertical_partition = N'false', @ins_cmd = N'CALL sp_MSins_dboTBL_USUARIO_SEDE', @del_cmd = N'CALL sp_MSdel_dboTBL_USUARIO_SEDE', @upd_cmd = N'SCALL sp_MSupd_dboTBL_USUARIO_SEDE'
GO




