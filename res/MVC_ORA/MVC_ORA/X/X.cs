using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using Oracle.ManagedDataAccess.Client;
using Oracle.ManagedDataAccess.Types;
using System.Configuration;
namespace MVC_ORA.X
{
    public class X
    {
        static OracleConnection cnx;
        static string str_cnx = ConfigurationManager.ConnectionStrings["cnx"].ConnectionString;

        public static OracleCommand cmd(string procedure_name, params object[] parameters) {
            cnx = new OracleConnection(str_cnx);
            OracleCommand cmd = new OracleCommand(procedure_name, cnx);
            cmd.CommandType = CommandType.StoredProcedure;
            cnx.Open();
            int counter = 0;
            OracleCommandBuilder.DeriveParameters(cmd);
            foreach (OracleParameter param in cmd.Parameters) {
                if (param.OracleDbType == OracleDbType.RefCursor) {
                    param.Direction = ParameterDirection.Output;
                } else {
                    param.Direction = ParameterDirection.Input;
                    param.Value = parameters[counter];
                    counter++;
                }
            }
            return cmd;
        }

        public static DataTable get(string procedure_name, params object[] parameters) {
            DataTable tbl = new DataTable();
            using (OracleDataReader rdr = cmd(procedure_name, parameters).ExecuteReader(CommandBehavior.CloseConnection)) {
                tbl.Load(rdr);
            }
            return tbl;
        }

        public static string set(string procedure_name, params object[] parameters) {
            try{
                cmd(procedure_name, parameters).ExecuteNonQuery().ToString();
                return "success";
            } catch (Exception ex) {
                return ex.Message;
            }finally{
                cnx.Close();
            }
        }

        public static string getScalar(string procedure_name, params object[] parameters) {
            try{
                return cmd(procedure_name, parameters).ExecuteScalar().ToString();
            }catch (Exception ex){
                return ex.Message;
            }finally {
                cnx.Close();
            }
        }

        public static string getJSON(string procedure_name, params object[] parameters) {
            return new System.Web.Script.Serialization.JavaScriptSerializer().Serialize(toDictionary(cmd(procedure_name, parameters).ExecuteReader(CommandBehavior.CloseConnection)));
        }

        static IEnumerable<Dictionary<string, object>> toDictionary(IDataReader rdr) {
            List<string> columns = new List<string>();
            List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();

            for (int i = 0; i < rdr.FieldCount; i++) {
                columns.Add(rdr.GetName(i));
            }

            while (rdr.Read()) {
                rows.Add(columns.ToDictionary(column => column, column => rdr[column]));
            }

            return rows;
        }
    }
}