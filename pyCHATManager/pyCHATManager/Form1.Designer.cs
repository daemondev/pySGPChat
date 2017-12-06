namespace pyCHATManager {
    partial class Form1 {
        /// <summary>
        /// Variable del diseñador requerida.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Limpiar los recursos que se estén utilizando.
        /// </summary>
        /// <param name="disposing">true si los recursos administrados se deben eliminar; false en caso contrario, false.</param>
        protected override void Dispose(bool disposing) {
            if (disposing && (components != null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Código generado por el Diseñador de Windows Forms

        /// <summary>
        /// Método necesario para admitir el Diseñador. No se puede modificar
        /// el contenido del método con el editor de código.
        /// </summary>
        private void InitializeComponent() {
            this.components = new System.ComponentModel.Container();
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.chkEdit = new System.Windows.Forms.CheckBox();
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.tsstDebug = new System.Windows.Forms.ToolStripStatusLabel();
            this.lsbProcess = new System.Windows.Forms.ListBox();
            this.btnSave = new System.Windows.Forms.Button();
            this.txtDatabase = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.txtPassword = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.txtUser = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txtHost = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.btnRestart = new System.Windows.Forms.Button();
            this.lblPySGPChatExeDir = new System.Windows.Forms.Label();
            this.btnStopPySGPChatService = new System.Windows.Forms.Button();
            this.trayIcon = new System.Windows.Forms.NotifyIcon(this.components);
            this.btnExit = new System.Windows.Forms.Button();
            this.groupBox1.SuspendLayout();
            this.statusStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.btnExit);
            this.groupBox1.Controls.Add(this.btnStopPySGPChatService);
            this.groupBox1.Controls.Add(this.lblPySGPChatExeDir);
            this.groupBox1.Controls.Add(this.btnRestart);
            this.groupBox1.Controls.Add(this.chkEdit);
            this.groupBox1.Controls.Add(this.statusStrip1);
            this.groupBox1.Controls.Add(this.lsbProcess);
            this.groupBox1.Controls.Add(this.btnSave);
            this.groupBox1.Controls.Add(this.txtDatabase);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.txtPassword);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Controls.Add(this.txtUser);
            this.groupBox1.Controls.Add(this.label2);
            this.groupBox1.Controls.Add(this.txtHost);
            this.groupBox1.Controls.Add(this.label1);
            this.groupBox1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.groupBox1.Location = new System.Drawing.Point(0, 0);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(331, 428);
            this.groupBox1.TabIndex = 0;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "MSSQL DB Server Connection Config";
            // 
            // chkEdit
            // 
            this.chkEdit.AutoSize = true;
            this.chkEdit.ForeColor = System.Drawing.Color.Red;
            this.chkEdit.Location = new System.Drawing.Point(270, 12);
            this.chkEdit.Margin = new System.Windows.Forms.Padding(0);
            this.chkEdit.Name = "chkEdit";
            this.chkEdit.RightToLeft = System.Windows.Forms.RightToLeft.Yes;
            this.chkEdit.Size = new System.Drawing.Size(44, 17);
            this.chkEdit.TabIndex = 11;
            this.chkEdit.Text = "Edit";
            this.chkEdit.UseVisualStyleBackColor = true;
            this.chkEdit.CheckedChanged += new System.EventHandler(this.chkEdit_CheckedChanged);
            // 
            // statusStrip1
            // 
            this.statusStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsstDebug});
            this.statusStrip1.Location = new System.Drawing.Point(3, 403);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(325, 22);
            this.statusStrip1.TabIndex = 10;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // tsstDebug
            // 
            this.tsstDebug.Name = "tsstDebug";
            this.tsstDebug.Size = new System.Drawing.Size(16, 17);
            this.tsstDebug.Text = "...";
            // 
            // lsbProcess
            // 
            this.lsbProcess.FormattingEnabled = true;
            this.lsbProcess.Location = new System.Drawing.Point(15, 180);
            this.lsbProcess.Name = "lsbProcess";
            this.lsbProcess.Size = new System.Drawing.Size(299, 95);
            this.lsbProcess.TabIndex = 9;
            // 
            // btnSave
            // 
            this.btnSave.Location = new System.Drawing.Point(15, 147);
            this.btnSave.Name = "btnSave";
            this.btnSave.Size = new System.Drawing.Size(299, 23);
            this.btnSave.TabIndex = 8;
            this.btnSave.Text = "SAVE";
            this.btnSave.UseVisualStyleBackColor = true;
            this.btnSave.Click += new System.EventHandler(this.btnSave_Click);
            // 
            // txtDatabase
            // 
            this.txtDatabase.Location = new System.Drawing.Point(118, 113);
            this.txtDatabase.Name = "txtDatabase";
            this.txtDatabase.Size = new System.Drawing.Size(196, 20);
            this.txtDatabase.TabIndex = 7;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(12, 116);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(67, 13);
            this.label4.TabIndex = 6;
            this.label4.Text = "DATABASE:";
            // 
            // txtPassword
            // 
            this.txtPassword.Location = new System.Drawing.Point(118, 87);
            this.txtPassword.Name = "txtPassword";
            this.txtPassword.Size = new System.Drawing.Size(196, 20);
            this.txtPassword.TabIndex = 5;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(12, 90);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(73, 13);
            this.label3.TabIndex = 4;
            this.label3.Text = "PASSWORD:";
            // 
            // txtUser
            // 
            this.txtUser.Location = new System.Drawing.Point(118, 61);
            this.txtUser.Name = "txtUser";
            this.txtUser.Size = new System.Drawing.Size(196, 20);
            this.txtUser.TabIndex = 3;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 64);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(40, 13);
            this.label2.TabIndex = 2;
            this.label2.Text = "USER:";
            // 
            // txtHost
            // 
            this.txtHost.Location = new System.Drawing.Point(118, 35);
            this.txtHost.Name = "txtHost";
            this.txtHost.Size = new System.Drawing.Size(196, 20);
            this.txtHost.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 38);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(40, 13);
            this.label1.TabIndex = 0;
            this.label1.Text = "HOST:";
            // 
            // btnRestart
            // 
            this.btnRestart.Location = new System.Drawing.Point(15, 307);
            this.btnRestart.Name = "btnRestart";
            this.btnRestart.Size = new System.Drawing.Size(299, 23);
            this.btnRestart.TabIndex = 12;
            this.btnRestart.Text = "START pySGPChat SERVICE";
            this.btnRestart.UseVisualStyleBackColor = true;
            this.btnRestart.Click += new System.EventHandler(this.btnRestart_Click);
            // 
            // lblPySGPChatExeDir
            // 
            this.lblPySGPChatExeDir.AutoSize = true;
            this.lblPySGPChatExeDir.ForeColor = System.Drawing.SystemColors.HotTrack;
            this.lblPySGPChatExeDir.Location = new System.Drawing.Point(15, 282);
            this.lblPySGPChatExeDir.Name = "lblPySGPChatExeDir";
            this.lblPySGPChatExeDir.Size = new System.Drawing.Size(16, 13);
            this.lblPySGPChatExeDir.TabIndex = 13;
            this.lblPySGPChatExeDir.Text = "...";
            // 
            // btnStopPySGPChatService
            // 
            this.btnStopPySGPChatService.Location = new System.Drawing.Point(15, 336);
            this.btnStopPySGPChatService.Name = "btnStopPySGPChatService";
            this.btnStopPySGPChatService.Size = new System.Drawing.Size(299, 23);
            this.btnStopPySGPChatService.TabIndex = 14;
            this.btnStopPySGPChatService.Text = "STOP pySGPChat SERVICE";
            this.btnStopPySGPChatService.UseVisualStyleBackColor = true;
            this.btnStopPySGPChatService.Click += new System.EventHandler(this.btnStopPySGPChatService_Click);
            // 
            // trayIcon
            // 
            this.trayIcon.BalloonTipIcon = System.Windows.Forms.ToolTipIcon.Info;
            this.trayIcon.Icon = ((System.Drawing.Icon)(resources.GetObject("trayIcon.Icon")));
            this.trayIcon.Text = "pySGPChat Service Manager";
            this.trayIcon.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.notifyIcon1_MouseDoubleClick);
            // 
            // btnExit
            // 
            this.btnExit.Location = new System.Drawing.Point(15, 365);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(299, 23);
            this.btnExit.TabIndex = 15;
            this.btnExit.Text = "EXIT";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(331, 428);
            this.Controls.Add(this.groupBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.Fixed3D;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.Name = "Form1";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "pySGPChat Manager";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Form1_FormClosing);
            this.Load += new System.EventHandler(this.Form1_Load);
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.statusStrip1.ResumeLayout(false);
            this.statusStrip1.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.ListBox lsbProcess;
        private System.Windows.Forms.Button btnSave;
        private System.Windows.Forms.TextBox txtDatabase;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox txtPassword;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox txtUser;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txtHost;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.StatusStrip statusStrip1;
        private System.Windows.Forms.ToolStripStatusLabel tsstDebug;
        private System.Windows.Forms.CheckBox chkEdit;
        private System.Windows.Forms.Button btnRestart;
        private System.Windows.Forms.Label lblPySGPChatExeDir;
        private System.Windows.Forms.Button btnStopPySGPChatService;
        private System.Windows.Forms.NotifyIcon trayIcon;
        private System.Windows.Forms.Button btnExit;
    }
}

