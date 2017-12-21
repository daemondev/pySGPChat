using System;
using System.Collections.Generic;
using System.Text;
using OpenQA.Selenium;
using System.Data;
using System.Data.SQLite;

using MongoDB.Bson;
using MongoDB.Driver;

namespace daemonDEV.beBOT {    

    public class Util {
        public static bool find(string by, string pattern, IWebDriver driver, out IWebElement element) {
            element = driver.FindElement(By.Id(pattern));
            return (element != null);
        }

        
    }

    public class Ngine {
        public static string title = "beBOT - Automatic WebPage's Navigator";
    }

    public class X
    {

        SQLiteConnection cnx = new SQLiteConnection("Data Source=beBOT.bot;New=True;");

        public SQLiteCommand cmd(string procedure_name, params Object[] parameters)
        {
            SQLiteCommand cmd = new SQLiteCommand(procedure_name, cnx);
            cmd.CommandType = System.Data.CommandType.StoredProcedure;

            cnx.Open();
            int counter = 0;
            foreach (SQLiteParameter param in cmd.Parameters)
            {
                param.Value = parameters[counter];
                counter++;
            }

            return cmd;
        }

        public DataTable get(string procedure_name, params Object[] parameters)
        {
            DataTable tbl = new DataTable("tmp");
            using (SQLiteDataReader rdr = cmd(procedure_name, parameters).ExecuteReader(CommandBehavior.CloseConnection))
            {
                tbl.Load(rdr);
            }
            return tbl;
        }


        [SQLiteFunction(Name = "REGEXP", Arguments = 2, FuncType = FunctionType.Scalar)]
        class MyRegEx : SQLiteFunction
        {
            public override object Invoke(object[] args)
            {
                return System.Text.RegularExpressions.Regex.IsMatch(Convert.ToString(args[1]), Convert.ToString(args[0]));
            }
        }

        //example SQL:  SELECT * FROM Foo WHERE Foo.Name REGEXP '$bar'




        static SQLiteConnection conexion;
        public static void createDBifNotExists()
        {
            if (!System.IO.File.Exists("beBOT.bot"))
            {
                // Creamos la conexion a la BD. 
                // El Data Source contiene la ruta del archivo de la BD 
                conexion = new SQLiteConnection ("Data Source=beBOT.bot;Version=3;New=True;Compress=True;");
                conexion.Open();

                // Creamos la primera tabla
                string creacion = "CREATE TABLE sede "
                  + "(codigo VARCHAR(2) PRIMARY KEY, nombre VARCHAR(30));";

                SQLiteCommand cmd = new SQLiteCommand(creacion, conexion);
                cmd.ExecuteNonQuery();

                // Creamos la segunda tabla

                creacion = "CREATE TABLE persona "
                  + "(codigo VARCHAR(2) PRIMARY KEY, nombre VARCHAR(30),"
                  + " codigoCiudad VARCHAR(2) );";


                cmd = new SQLiteCommand(creacion, conexion);
                cmd.ExecuteNonQuery();

                creacion = @"CREATE table IF NOT EXISTS scripts (
                                 nombre varchar(70),
                                 script text,
                                 ins DATE DEFAULT (datetime('now','localtime')),
                                 estado int default 1
                            )";

                cmd = new SQLiteCommand(creacion, conexion);
                cmd.ExecuteNonQuery();
            } else {
                // Creamos la conexion a la BD. 
                // El Data Source contiene la ruta del archivo de la BD 
                conexion = new SQLiteConnection ("Data Source=beBOT.bot;Version=3;New=False;Compress=True;");
                conexion.Open();

            }
        }

        public static void insertScript(string command) {           
            //http://www.sqlitetutorial.net/sqlite-date/
            //http://www.sqlitetutorial.net/tryit/query/sqlite-date/#11
            //gmcs pruebaSQLite.cs /r:System.Data.SqLite.dll
            //SELECT name FROM sqlite_master WHERE name='table_name'
            //SELECT count(*) FROM sqlite_master WHERE type='table' AND name='table_name';
            //CREATE table IF NOT EXISTS table_name (para1,para2);
            //string query = "CREATE table IF NOT EXISTS scripts (id int,script varchar(600));";   
            //https://www.devart.com/dotconnect/sqlite/docs/UDF.html         

            string query = "insert into scripts(nombre, script) values('primer', '"+ command +"');";

            SQLiteCommand cmd = new SQLiteCommand(query, conexion);
            cmd.ExecuteNonQuery();
        }

        //public static void LoadSQLLiteAssembly()
        //{
        //    Uri dir = new Uri( Assembly.GetExecutingAssembly().CodeBase);
        //    FileInfo fi = new FileInfo(dir.AbsolutePath);
        //    string appropriateFile = Path.Combine(fi.Directory.FullName, GetAppropriateSQLLiteAssembly());
        //    Assembly.LoadFrom(appropriateFile);
        //}

        //private static string GetAppropriateSQLLiteAssembly()
        //{
        //    string pa = Environment.GetEnvironmentVariable("PROCESSOR_ARCHITECTURE");
        //    string arch = ((String.IsNullOrEmpty(pa) || String.Compare(pa, 0, "x86", 0, 3, true) == 0) ? "32" : "64");
        //    return "System.Data.SQLite.x" + arch + ".DLL";
        //}

        public static void insertData() {

            string insercion;  // Orden de insercion, en SQL
            SQLiteCommand cmd; // Comando de SQLite
            int cantidad;      // Resultado: cantidad de datos


            try {
                insercion = "INSERT INTO ciudad " +
                  "VALUES  ('t','Toledo');";
                cmd = new SQLiteCommand(insercion, conexion);

                cantidad = cmd.ExecuteNonQuery();
                if (cantidad < 1)

                    Console.WriteLine("No se ha podido insertar");

                insercion = "INSERT INTO ciudad " +
                  "VALUES  ('a','Alicante');";

                cmd = new SQLiteCommand(insercion, conexion);
                cantidad = cmd.ExecuteNonQuery();

                if (cantidad < 1)
                    Console.WriteLine("No se ha podido insertar");


                insercion = "INSERT INTO persona " +
                   "VALUES  ('j','Juan','t');";
                cmd = new SQLiteCommand(insercion, conexion);

                cantidad = cmd.ExecuteNonQuery();
                if (cantidad < 1)

                    Console.WriteLine("No se ha podido insertar");

                insercion = "INSERT INTO persona " +
                  "VALUES  ('p','Pepe','t');";

                cmd = new SQLiteCommand(insercion, conexion);
                cantidad = cmd.ExecuteNonQuery();

                if (cantidad < 1)
                    Console.WriteLine("No se ha podido insertar");

            }
            catch (Exception e)
            {
                Console.WriteLine("No se ha podido insertar");

                Console.WriteLine("Posiblemente un código está repetido");
                Console.WriteLine("Error encontrado: {0} ", e.Message);

            }
        }
    }

    public class XMongo {

        public static MongoClient client;
        public static MongoServer server = new MongoClient("mongodb://localhost:27017").GetServer();
        public static MongoDatabase db = server.GetDatabase("beBOT");
        public XMongo() {
            //server = new MongoClient("mongodb://localhost:27017").GetServer();
            //server = new MongoClient("mongodb://localhost:3001").GetServer();
            server = new MongoClient("mongodb://localhost:27017").GetServer();

            //db = server.GetDatabase("beBOT");
            db = server.GetDatabase("beBOT");
            /*
            var collection = db.GetCollection("tasks").FindAll();
            foreach (var item in collection)
            {
                System.Windows.Forms.MessageBox.Show(item.ToString());
            }//*/
        }

        public static bool insertScript(string command) {
            //var scripts = db.GetCollection<BsonDocument>("scripts");
            var scripts = db.GetCollection("scripts");
            var rst = false;
            try{
                Dictionary<string, string> script = new Dictionary<string, string> { 
                    {"nombre", "firts"},
                    {"script", command},
                    {"ins", DateTime.Now.ToString()}
                };
                //scripts.Insert(new BsonDocument("script", command));
                scripts.Insert(new BsonDocument(script));
                rst = true;
            }catch (Exception ex){
                System.Windows.Forms.MessageBox.Show(ex.Message); 
            }            
            return rst;
        }

        public static DataTable getScripts() {
            DataTable tbl = new DataTable("scripts");
            var scripts = db.GetCollection("scripts").FindAll();

            //var cols = scripts.Collection;
            //System.Windows.Forms.MessageBox.Show(cols.ToString());   
            /*
            string map = @"function() { 
        for (var key in this) { emit(key, null); }
        }";
            string reduce = @"function(key, stuff) { return null; }";
            string finalize = @"function(key, value){
            return key;
        }";
            MapReduceArgs args = new MapReduceArgs();
            args.FinalizeFunction = new BsonJavaScript(finalize);
            args.MapFunction = new BsonJavaScript(map);
            args.ReduceFunction = new BsonJavaScript(reduce);
            var results = scripts.Collection.MapReduce(args);
            foreach (var result in results.GetResults())// .GetResults().Select(item => item["_id"]))
            {
                //Console.WriteLine(result.AsString);
                System.Windows.Forms.MessageBox.Show(result.ToString());   
            } //*/

            IEnumerator<BsonDocument> enu = scripts.GetEnumerator();

            if(enu.MoveNext()){
                /*
                var rawCols = System.Text.RegularExpressions.Regex.Replace(enu.Current.Names.ToJson(), "[\"\\[\\]]", "").Split(',');
                columns = new DataColumn[rawCols.Length];
                int counter = 0;
                foreach (var colName in rawCols){
                    System.Windows.Forms.MessageBox.Show(colName);
                    columns[counter] = new DataColumn(colName, typeof(string));
                }//*/
                
                DataRow row = tbl.NewRow();
                foreach (var item in enu.Current){                    
                    tbl.Columns.Add(item.Name.ToUpper(), typeof(string));                    
                    if (item.Name.Equals("_id")){
                        row[item.Name] = item.Value.ToString();                        
                    } else {
                        row[item.Name] = item.Value;
                    }
                }
                tbl.Rows.Add(row);                
            }
            
            while (enu.MoveNext()){                
                //tbl.Rows.Add(System.Text.RegularExpressions.Regex.Replace(enu.Current.Values.ToJson(), "[\"\\[\\]]", "").Split(','));

                tbl.Rows.Add();
                int j = 0;
                foreach (var item in enu.Current) {
                    /*
                    if (item.Name.Equals("_id")) {
                        tbl.Rows[tbl.Rows.Count - 1][j] = item.Value.ToString();
                    } else {
                        tbl.Rows[tbl.Rows.Count - 1][j] = item.Value.ToString();
                    }//*/
                    tbl.Rows[tbl.Rows.Count - 1][j] = item.Value.ToString();
                    j++;
                }
            }

            ///*
            foreach (var item in scripts){
                /*
                System.Windows.Forms.MessageBox.Show("name :  " + item.Names.ToJson());   
                foreach (var e in item){
                    //System.Windows.Forms.MessageBox.Show(e.Name + " - " + e.Value);   
                } //*/

                //System.Windows.Forms.MessageBox.Show(item["_id"] + " - " + item["nombre"] + " - " + item["script"] + " - " + item.Names.ToJson()); 
            }  //*/
            //var A = 0;
            
            return tbl;
        }
    }

}
