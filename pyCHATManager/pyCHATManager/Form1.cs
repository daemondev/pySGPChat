using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace pyCHATManager {
    public partial class Form1 : Form {
        public Form1() {
            InitializeComponent();
            t1 = new Timer();
            t1.Tick += new EventHandler(t1_Tick);
            t1.Interval = 2000;
            //notifyIcon1.Click += ToggleMinimizeState;    
            bw = new BackgroundWorker();
            bw.DoWork += Bw_DoWork;
            bw.RunWorkerCompleted += Bw_RunWorkerCompleted;
        }

        private void Bw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e){            
            pgbar.Visible = false;
        }

        private void Bw_DoWork(object sender, DoWorkEventArgs e)
        {
            //syncData();
            try {
                string currentPath = Application.StartupPath;
                string ultimatePath = System.IO.Path.Combine(currentPath, "pySGPChat.exe");

                if (!System.IO.File.Exists(ultimatePath)) {
                    ultimatePath = lblPySGPChatExeDir.Text;
                    currentPath = pySGPChatWorkDir;
                }

                //throw new NotImplementedException();
                //System.Diagnostics.ProcessStartInfo proc = new System.Diagnostics.ProcessStartInfo(lblPySGPChatExeDir.Text);
                System.Diagnostics.ProcessStartInfo proc = new System.Diagnostics.ProcessStartInfo(ultimatePath);
                proc.Arguments = string.Format(@"--setup --host {0} --usr {1} --pwd {2} --db {3} --port {4} --ip {5}", host.Replace("\\","\\\\"), usr, pwd, db, port, ip);
                //MessageBox.Show(proc.Arguments);
                //proc.Arguments = "--setup";

                //MessageBox.Show(ultimatePath+" - "+ currentPath);
                
                //proc.WorkingDirectory = pySGPChatWorkDir;
                proc.WorkingDirectory = currentPath;
                System.Diagnostics.Process.Start(proc);
            } catch (Exception ex) {

                MessageBox.Show("ERROR!!!: " + ex.Message);
            }
            
        }

        void t1_Tick(object sender, EventArgs e) {
            try {
                listPythonProcess();               
            } catch {
                lsbProcess.Items.Clear();
            }
        }

        string host, usr, pwd, db, pySGPChatPath, port, ip;
        void loadEnvVars() {
            lsbProcess.Items.Clear();
            
            try {
                toggleState(chkEdit.Checked);
                EnvironmentVariableTarget t = EnvironmentVariableTarget.Machine;
                host = Environment.GetEnvironmentVariable("pySGPChatMSSQLHost",t);
                usr = Environment.GetEnvironmentVariable("pySGPChatMSSQLUsr",t);
                pwd = Environment.GetEnvironmentVariable("pySGPChatMSSQLPwd",t);
                db = Environment.GetEnvironmentVariable("pySGPChatMSSQLDB",t);
                port = Environment.GetEnvironmentVariable("pySGPChatPORT",t);
                ip = Environment.GetEnvironmentVariable("pySGPChatIP", t);
                pySGPChatPath = Environment.GetEnvironmentVariable("pySGPChatPath",t);

                txtHost.Text = host;
                txtUser.Text = usr;
                txtPassword.Text = pwd;
                txtDatabase.Text = db;
                cboDatabases.Text = db;
                txtServicePort.Text = port;
                cboIps.Text = ip;
                if (!string.IsNullOrEmpty(ip)) {
                    if (cboIps.Items.Contains(ip)) {
                        cboIps.Text = ip;
                    } else {
                        cboIps.Items.Add(ip);
                        cboIps.Text = ip;
                    }
                }                

                tsstDebug.Text = "Configuration OK";

                listPythonProcess();

            } catch {
                tsstDebug.Text = "Database Config is not configured!!!";
            }
        }
        public string LocalIPAddress() {
            System.Net.IPHostEntry host;
            string localIP = "";
            host = System.Net.Dns.GetHostEntry(System.Net.Dns.GetHostName());
            cboIps.Items.Clear();
            foreach (System.Net.IPAddress ip in host.AddressList) {
                if (ip.AddressFamily.ToString() == "InterNetwork") {
                    cboIps.Items.Add(ip.ToString());
                    if (!ip.ToString().StartsWith("127.0.")) {                        
                        localIP = ip.ToString();
                    }
                    
                }
            }
            return localIP;
        }

        void populateGrid() {
            /*
            gvServices.ColumnCount = 4;
            gvServices.Columns[0].Name = "item";
            gvServices.Columns[0].Width = 35;

            gvServices.Columns[1].Name = "Service Name";
            gvServices.Columns[2].Name = "Service ID";
            gvServices.Columns[3].Name = "MEMORY SIZE";
            foreach (DataGridViewColumn col in gvServices.Columns) {
                
            }

            /*
            DataGridViewColumn col = new DataGridViewColumn();
            col.HeaderText = "item";
            gvServices.Columns.Add(col);
            DataGridViewColumn col2 = new DataGridViewColumn();
            col2.HeaderText = "SERVICE NAME";            
            gvServices.Columns.Add(col2);/**/

            //gvServices.SelectionMode = DataGridViewSelectionMode.FullRowSelect;            
            gvServices.RowHeadersVisible = false;
            gvServices.Font =new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));            

        }

        private void Form1_Load(object sender, EventArgs e) {
            lsbProcess.Hide();
            txtDatabase.Hide();
            //this.Resize += SetMinimizeState;
            //this.FormClosing += SetMinimizeState;
            cboIps.Text = LocalIPAddress();
            btnStopPySGPChatService.Enabled = false;
            loadEnvVars();            
            cboDatabases.Items.Add("<search>");
            populateGrid();
            t1.Start();
            string pySGPChatFileExeDir = getPySGPChatBinaryDir();
            if (!string.IsNullOrEmpty(pySGPChatFileExeDir)) {
                lblPySGPChatExeDir.Text = pySGPChatFileExeDir;                
            } else {
                lblPySGPChatExeDir.Text = "FILE: [pySGPChat.exe] is not installed!!!";
                btnRestart.Enabled = false;
                btnStopPySGPChatService.Enabled = false;
            }
        }

        Dictionary<string, List<string>> dictProcess;
        Dictionary<string, List<string>> dictProcessPermanent = new Dictionary<string,List<string>>();
        bool existPySGPChatBinary;


        bool firstMacth = false;
        [System.Diagnostics.DebuggerStepThrough]
        void listPythonProcess() {
            existPySGPChatBinary = false;
            dictProcess = new Dictionary<string, List<string>>();
            lsbProcess.Items.Clear();           

            System.Diagnostics.Process[] localAll = System.Diagnostics.Process.GetProcesses();
            string processName = "";
           
            foreach (System.Diagnostics.Process item in localAll) {
                processName = item.ProcessName;
                if (processName.StartsWith("py") && !processName.StartsWith("pyCHATManager")) {
                    try {

                        lsbProcess.Items.Add(string.Concat(item.ProcessName, " - ", item.Id.ToString()));
                        
                        dictProcess.Add(item.ProcessName, new List<string>() { 
                            item.Id.ToString()                          //0 = id
                            , item.ProcessName                          //1 = name
                            , item.StartTime.ToString()                 //2 = startTime
                            , (item.VirtualMemorySize64 / (1024 * 1024)).ToString()       //3 = vMem
                            //, (item.PrivateMemorySize64 / (1024 * 1024)).ToString()       //4 = pMem
                            , (ConvertBytesToMegabytes(item.PrivateMemorySize64)).ToString("0.000")       //4 = pMem
                            //, (ConvertBytesToMegabytes(item.WorkingSet64)).ToString()       //4 = pMem
                            //, (ConvertBytesToMegabytes(item.PeakWorkingSet64)).ToString()          //4 = pMem
                            , item.MainModule.FileName                  //5 = FileDir
                            , (DateTime.Now - item.StartTime).ToString() //5 time
                        });              //5 = FileDir


                        if (processName.Equals("pySGPChat")) {
                            existPySGPChatBinary = true;                            
                            btnRestart.Text = "RESTART pySGPChat SERVICE";                            
                        } else {
                            if(!existPySGPChatBinary){
                                btnRestart.Text = "START SERVICE";
                            }                            
                        }
                    } catch { }
                    //MessageBox.Show("xx");
                }               
            }
            if(existPySGPChatBinary){
                btnStopPySGPChatService.Enabled = true;
            }

            if (!firstMacth) {
                //MessageBox.Show("first");
                //dictProcessPermanent = dictProcess;
                firstMacth = true;
            }

            if (dictProcess.Count.Equals(0)) {
                gvServices.Rows.Clear();
                dictProcessPermanent.Clear();
            } else { 
                //if(dictProcessPermanent.Equals(dictProcess)){
                if(!areEqualDict(dictProcess, dictProcessPermanent)){                
                //if(!dictProcessPermanent.SequenceEqual(dictProcess)){                
                //if(!(dictProcessPermanent.Keys.Count == dictProcess.Keys.Count &&    dictProcessPermanent.Keys.All(k => dictProcess.ContainsKey(k) && object.Equals(dictProcess[k], dictProcessPermanent[k])))){
                    dictProcessPermanent = dictProcess.ToDictionary(entry => entry.Key, entry => entry.Value);
                    tstDebug.Text = "step: [" + counter.ToString() + " - " + dictProcessPermanent.Count.ToString() + "]";


                    if (gvServices.Rows.Count.Equals(0)) {
                        foreach (var item in dictProcessPermanent.Values) {
                            //MessageBox.Show(item[0]);

                            gvServices.Rows.Add(new string[] { item[0], item[1], item[0], item[4] });
                        }
                    } else {

                        foreach (DataGridViewRow row in gvServices.Rows) {
                            if (dictProcessPermanent.Keys.Contains<string>(row.Cells[1].Value.ToString())) {
                                row.Cells[3].Value = dictProcessPermanent[row.Cells[1].Value.ToString()][4];
                            }
                        }
                    }

                    


                    
                }
            }

            counter++;
        }
        static double ConvertBytesToMegabytes(long bytes) {
            return (bytes / 1024f) / 1024f;
        }
        
        /*
        public static bool EqualsAll<T>(this IList<T> a, IList<T> b) {
            if (a == null || b == null)
                return (a == null && b == null);

            if (a.Count != b.Count)
                return false;

            return a.SequenceEqual(b);
        } /**/
        bool areEqualDict(Dictionary<string, List<string>> dict, Dictionary<string, List<string>> dict2) {
            bool equal = false;
            if (dict.Count == dict2.Count) { // Require equal count.        
                equal = true;
                foreach (var pair in dict) {
                    List<string> value;

                    if (dict2.TryGetValue(pair.Key, out value)) {
                        // Require value be equal.
                        //if (value != pair.Value) {
                        if (!value.SequenceEqual(pair.Value)) {
                            equal = false;
                            break;
                        }
                    } else {
                        // Require key be present.
                        equal = false;
                        break;
                    }
                }
            }
            return equal;
        }

        int counter = 0;

        Timer t1;

        void toggleState(bool state) {
            txtHost.Enabled = state;
            txtUser.Enabled = state;
            txtPassword.Enabled = state;
            txtDatabase.Enabled = state;
            btnSave.Enabled = state;
            btnTestConnection.Enabled = state;
            cboDatabases.Enabled = state;
            txtServicePort.Enabled = state;            
            cboIps.Enabled = state;
            if (state) {                
                chkEdit.ForeColor = Color.Green;
            } else {
                chkEdit.ForeColor = Color.Red;
            }
        }

        string pySGPChatEXE = "";
        string pySGPChatWorkDir = "";
        string getPySGPChatBinaryDir() {
            string folderPath = Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string folderPathX86 = Environment.GetEnvironmentVariable("PROGRAMFILES(X86)") ?? Environment.GetFolderPath(Environment.SpecialFolder.ProgramFiles);
            string[] ls = System.IO.Directory.GetDirectories(folderPathX86,"pySGPChat*");
            
            foreach (string dir in ls) {
                int lastInvertChat = dir.LastIndexOf('\\')+1;
                string dirName = dir.Substring(lastInvertChat, dir.Length - lastInvertChat);                
                if(dirName.StartsWith("pySGPChat")){
                    pySGPChatWorkDir = dir;
                    string[] files = System.IO.Directory.GetFiles(dir,"pySGPChat*");                    
                    foreach (string file in files) {
                        int lastInvertChatFile = file.LastIndexOf('\\') + 1;
                        string fileName = file.Substring(lastInvertChatFile, file.Length - lastInvertChatFile);                                        
                        if (fileName.Equals("pySGPChat.exe")) {                            
                            pySGPChatEXE = file;
                        }
                    }
                    
                }                                
            }
            return pySGPChatEXE;
        }

        private void chkEdit_CheckedChanged(object sender, EventArgs e) {
            toggleState(chkEdit.Checked);            
        }

        void saveEnvVars() {            
            try {
                host = txtHost.Text;
                usr = txtUser.Text;
                pwd = txtPassword.Text;
                //db = txtDatabase.Text;
                db = cboDatabases.Text;
                port = txtServicePort.Text;
                ip = cboIps.Text;

                EnvironmentVariableTarget t = EnvironmentVariableTarget.Machine;

                Environment.SetEnvironmentVariable("pySGPChatMSSQLHost", host, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLUsr", usr, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLPwd", pwd, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLDB", db, t);
                Environment.SetEnvironmentVariable("pySGPChatPORT", port, t);
                Environment.SetEnvironmentVariable("pySGPChatIP", ip, t);
                loadEnvVars();
            } catch (Exception ex){
                tsstDebug.Text = "Error saving DB config";
                MessageBox.Show(ex.Message);
            }
        }

        private void btnSave_Click(object sender, EventArgs e) {
            saveEnvVars();
        }


        void restart() { 
        
        }

        void syncData() {
            host = txtHost.Text;
            usr = txtUser.Text;
            pwd = txtPassword.Text;
            db = cboDatabases.Text;
            port = txtServicePort.Text;
            ip = cboIps.Text;
        }

        BackgroundWorker bw;

        bool start() {            
            try {
                syncData();
                pgbar.Visible = true;
                bw.RunWorkerAsync();                
                return true;
            } catch {return false;}            
        }

        bool stop() {            
            try {
                if (dictProcess.Keys.Contains("pySGPChat")) {
                    int processID = Convert.ToInt32(dictProcess["pySGPChat"][0]);
                    System.Diagnostics.Process.GetProcessById(processID).Kill();
                }
                return true;
            } catch  {return false;}            
        }

        bool processManager(string task) {
            bool res = true;
            if(task.Equals("restart")){
                res = stop();
                res = start();                
            }else if(task.Equals("stop")){
                res = stop();
            }
            return res;
        }

        private void btnRestart_Click(object sender, EventArgs e) {            
            processManager("restart");
            listPythonProcess();                    
            btnRestart.Text = "RESTART pySGPChat SERVICE";
            
        }

        public void GetInstalledApps() {
            string uninstallKey = @"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall";
            using (Microsoft.Win32.RegistryKey rk = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(uninstallKey)) {
                foreach (string skName in rk.GetSubKeyNames()) {
                    using (Microsoft.Win32.RegistryKey sk = rk.OpenSubKey(skName)) {
                        try {
                            lsbProcess.Items.Add(sk.GetValue("DisplayName") + " - " +sk.GetValue("InstallLocation").ToString());
                        } catch (Exception ex) { }
                    }
                }
            }
        }

        private void btnStopPySGPChatService_Click(object sender, EventArgs e) {            
            btnStopPySGPChatService.Enabled = !processManager("stop");            
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e) {
            if (e.CloseReason == CloseReason.UserClosing) {
                trayIcon.Visible = true;
                this.Hide();
                e.Cancel = true;
                //MinimizeToTray();
            }
        }

        public void MinimizeToTray() {
            try {
                trayIcon.BalloonTipTitle = "Sample text";
                trayIcon.BalloonTipText = "Form is minimized";

                if (FormWindowState.Minimized == this.WindowState) {
                    trayIcon.Visible = true;
                    trayIcon.ShowBalloonTip(500);
                    this.Hide();
                } else if (FormWindowState.Normal == this.WindowState) {
                    trayIcon.Visible = false;
                }
            } catch (Exception ex) {
                MessageBox.Show(ex.Message);
            }
        }

        private void notifyIcon1_MouseDoubleClick(object sender, MouseEventArgs e) {
            ShowInTaskbar = true;
            trayIcon.Visible = false;
            WindowState = FormWindowState.Normal;
            this.Show();
        }

        private void ToggleMinimizeState(object sender, EventArgs e) {

        }
        
        private void SetMinimizeState(object sender, EventArgs e) {
            bool isMinimized = this.WindowState == FormWindowState.Minimized;
            WindowState = FormWindowState.Minimized;
            this.ShowInTaskbar = !isMinimized;
            trayIcon.Visible = isMinimized;
            if (isMinimized) trayIcon.ShowBalloonTip(500, "Application", "Application minimized to tray.", ToolTipIcon.Info);
        }

        private void btnExit_Click(object sender, EventArgs e) {
            Application.Exit();
        }

        private void btnTestConnection_Click(object sender, EventArgs e) {
            syncData();

            if (string.IsNullOrEmpty(db)) {
                MessageBox.Show("PLEASE INPUT A DATABASENAME");
                return;
            }
            string cnxString = string.Format("Data Source={0}; Initial Catalog={1}; User ID={2}; Password={3}",host, db , usr, pwd);            
            System.Data.SqlClient.SqlConnection cnx = new System.Data.SqlClient.SqlConnection(cnxString);
            string message = "";
            try {
                cnx.Open();
                /*
                System.Data.SqlClient.SqlCommand cmd = new System.Data.SqlClient.SqlCommand("select * from master.sys.databases",cnx);                
                IDataReader rdr = cmd.ExecuteReader();
                while(rdr.Read()){                    
                    MessageBox.Show(rdr.GetString(0));
                } /**/

                /*
                DataTable databases = cnx.GetSchema("Databases");
                foreach (DataRow item in databases.Rows) {
                    string databaseName = item.Field<string>("database_name");
                    short dbID = item.Field<short>("dbid");
                    DateTime created = item.Field<DateTime>("create_date");
                    MessageBox.Show(string.Format("databaseName: {0} - databaseID: {1} - createdTime: {2}", databaseName, dbID, created.ToString()));
                }/**/
            } catch (System.Data.SqlClient.SqlException ex) {
                message = ex.Message;
            }

            if (cnx.State.Equals(System.Data.ConnectionState.Open)) {
                MessageBox.Show("SUCCESSFUL CONNECTION!!! CURRENT STATE: ["+ cnx.State.ToString() +"]");
                cnx.Close();
            } else {
                MessageBox.Show("FAIL CONNECTION WITH SERVER!!!: ["+ message +"]");
            }
        }

        void populateCboDatabases(){
            syncData();

            if(string.IsNullOrEmpty(host)){
                host = "localhost\\SQLEXPRESS";
            }

            string cnxString = string.Format("Data Source={0}; Integrated Security=true;", host);
            System.Data.SqlClient.SqlConnection cnx = new System.Data.SqlClient.SqlConnection(cnxString);
            string message = "";
            cboDatabases.Items.Clear();

            try {
                cnx.Open();                
            } catch (System.Data.SqlClient.SqlException ex) {
                try {
                    if (db.Equals(search)) {
                        db = "";
                    }
                    cnxString = string.Format("Data Source={0}; Initial Catalog={1}; User ID={2}; Password={3}", host, db, usr, pwd);
                    cnx = new System.Data.SqlClient.SqlConnection(cnxString);
                    cnx.Open();
                } catch {}
                message = ex.Message;
            }
            if (cnx.State.Equals(System.Data.ConnectionState.Open)) {
                DataTable databases = cnx.GetSchema("Databases");
                foreach (DataRow item in databases.Rows) {
                    string databaseName = item.Field<string>("database_name");
                    cboDatabases.Items.Add(databaseName);
                }
            }

            cboDatabases.Items.Add(search);
        }
        string search = "<search>";
        private void comboBox1_SelectedIndexChanged(object sender, EventArgs e) {
            if (cboDatabases.Text.Equals(search)) {
                populateCboDatabases();
                cboDatabases.Text = "";
                cboDatabases.DroppedDown = true;
            }            
        }        
    }

    class ColorSelector : ComboBox {
        public ColorSelector() {
            DrawMode = DrawMode.OwnerDrawFixed;
            DropDownStyle = ComboBoxStyle.DropDownList;
        }

        // Draws the items into the ColorSelector object
        protected override void OnDrawItem(DrawItemEventArgs e) {
            e.DrawBackground();
            e.DrawFocusRectangle();

            DropDownItem item = new  DropDownItem(Items[e.Index].ToString());
            // Draw the colored 16 x 16 square
            e.Graphics.DrawImage(item.Image, e.Bounds.Left, e.Bounds.Top);
            // Draw the value (in this case, the color name)
            e.Graphics.DrawString(item.Value, e.Font, new
                    SolidBrush(e.ForeColor), e.Bounds.Left + item.Image.Width, e.Bounds.Top + 2);

            base.OnDrawItem(e);
        }
    }

    public class DropDownItem {
        public string Value {
            get { return value; }
            set { this.value = value; }
        }
        private string value;

        public Image Image {
            get { return img; }
            set { img = value; }
        }
        private Image img;

        public DropDownItem()
            : this("") { }

        public DropDownItem(string val) {
            value = val;
            this.img = new Bitmap(16, 16);
            Graphics g = Graphics.FromImage(img);
            Brush b = new SolidBrush(Color.FromName(val));
            g.DrawRectangle(Pens.White, 0, 0, img.Width, img.Height);
            g.FillRectangle(b, 1, 1, img.Width - 1, img.Height - 1);
        }

        public override string ToString() {
            return value;
        }
    }
}
