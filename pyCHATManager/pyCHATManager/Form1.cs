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
        }

        void t1_Tick(object sender, EventArgs e) {
            try {
                listPythonProcess();               
            } catch {
                lsbProcess.Items.Clear();
            }
        }

        string host, usr, pwd, db, pySGPChatPath;
        void loadEnvVars() {
            lsbProcess.Items.Clear();
            
            try {
                toggleState(chkEdit.Checked);

                host = Environment.GetEnvironmentVariable("pySGPChatMSSQLHost");
                usr = Environment.GetEnvironmentVariable("pySGPChatMSSQLUsr");
                pwd = Environment.GetEnvironmentVariable("pySGPChatMSSQLPwd");
                db = Environment.GetEnvironmentVariable("pySGPChatMSSQLDB");
                pySGPChatPath = Environment.GetEnvironmentVariable("pySGPChatPath");

                txtHost.Text = host;
                txtUser.Text = usr;
                txtPassword.Text = pwd;
                txtDatabase.Text = db;

                tsstDebug.Text = "Configuration OK";

                listPythonProcess();

            } catch {
                tsstDebug.Text = "Database Config is not configured!!!";
            }
        }

        private void Form1_Load(object sender, EventArgs e) {
            
            //this.Resize += SetMinimizeState;
            //this.FormClosing += SetMinimizeState;
            btnStopPySGPChatService.Enabled = false;
            loadEnvVars();
            MessageBox.Show(string.Format("{0} {1} {2} {3}", host, usr, pwd, db));
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
        bool existPySGPChatBinary;
        void listPythonProcess() {
            existPySGPChatBinary = false;
            dictProcess = new Dictionary<string, List<string>>();
            lsbProcess.Items.Clear();
            System.Diagnostics.Process[] localAll = System.Diagnostics.Process.GetProcesses();
            string processName = "";
            foreach (System.Diagnostics.Process item in localAll) {
                processName = item.ProcessName;
                if (processName.StartsWith("py") && !processName.Equals("pyCHATManager")) {
                    try {
                        lsbProcess.Items.Add(string.Concat(item.ProcessName, " - ", item.Id.ToString()));
                        dictProcess.Add(item.ProcessName, new List<string>() { 
                            item.Id.ToString()
                            , item.ProcessName
                            , item.StartTime.ToString()
                            , item.VirtualMemorySize64.ToString()
                            , item.PrivateMemorySize64.ToString()
                            , item.MainModule.FileName });
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
        }

        Timer t1;

        void toggleState(bool state) {
            txtHost.Enabled = state;
            txtUser.Enabled = state;
            txtPassword.Enabled = state;
            txtDatabase.Enabled = state;
            btnSave.Enabled = state;
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
                db = txtDatabase.Text;

                EnvironmentVariableTarget t = EnvironmentVariableTarget.Machine;

                Environment.SetEnvironmentVariable("pySGPChatMSSQLHost", host, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLUsr", usr, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLPwd", pwd, t);
                Environment.SetEnvironmentVariable("pySGPChatMSSQLDB", db, t);
                loadEnvVars();
            } catch {
                tsstDebug.Text = "Error saving DB config";
            }
        }

        private void btnSave_Click(object sender, EventArgs e) {
            saveEnvVars();
        }


        void restart() { 
        
        }

        bool start() {            
            try {
                System.Diagnostics.ProcessStartInfo proc = new System.Diagnostics.ProcessStartInfo(lblPySGPChatExeDir.Text);
                proc.Arguments = string.Format("{0} {1} {2} {3}",host, usr, pwd, db);
                proc.WorkingDirectory = pySGPChatWorkDir;
                System.Diagnostics.Process.Start(proc);
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

        // Show/Hide window and tray icon to match window state.
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

       
    }
}
