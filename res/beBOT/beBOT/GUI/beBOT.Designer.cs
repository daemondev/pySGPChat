using System.Windows.Forms;
using daemonDEV.Windows.Forms;
namespace daemonDEV.beBOT
{
    partial class beBOT
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(beBOT));
            this.mainPanel = new System.Windows.Forms.Panel();
            this.statusStrip1 = new System.Windows.Forms.StatusStrip();
            this.tsslCache = new System.Windows.Forms.ToolStripStatusLabel();
            this.tsslPBCache = new System.Windows.Forms.ToolStripProgressBar();
            this.tsslWindowName = new System.Windows.Forms.ToolStripStatusLabel();
            this.panelBOT = new System.Windows.Forms.Panel();
            this.layoutBot = new System.Windows.Forms.TableLayoutPanel();
            this.btnSend = new System.Windows.Forms.Button();
            this.panelChoose = new System.Windows.Forms.Panel();
            this.gbxActions = new System.Windows.Forms.GroupBox();
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.btnExit = new System.Windows.Forms.Button();
            this.btnLoadScript = new System.Windows.Forms.Button();
            this.btnStart = new System.Windows.Forms.Button();
            this.btnTabs = new System.Windows.Forms.Button();
            this.btnSwitch = new System.Windows.Forms.Button();
            this.gbxBrowser = new System.Windows.Forms.GroupBox();
            this.rdIE = new System.Windows.Forms.RadioButton();
            this.rdChrome = new System.Windows.Forms.RadioButton();
            this.rdFirefox = new System.Windows.Forms.RadioButton();
            this.panelBotSubContainer = new System.Windows.Forms.Panel();
            this.panelScriptMode = new System.Windows.Forms.Panel();
            this.txtScriptMode = new System.Windows.Forms.TextBox();
            this.panelConsoleMode = new System.Windows.Forms.Panel();
            this.lsbxLog = new System.Windows.Forms.ListBox();
            this.panelDB = new System.Windows.Forms.Panel();
            this.button1 = new System.Windows.Forms.Button();
            this.btnInsertData = new System.Windows.Forms.Button();
            this.btnGetSqliteData = new System.Windows.Forms.Button();
            this.dataGridView1 = new System.Windows.Forms.DataGridView();
            this.panelTasks = new System.Windows.Forms.Panel();
            this.txtCommand = new daemonDEV.beBOT.AutoCompleteTextBox();
            this.tabMENU = new daemonDEV.Windows.Forms.TabStrip();
            this.tabBOT = new daemonDEV.Windows.Forms.TabStripButton();
            this.tabTasks = new daemonDEV.Windows.Forms.TabStripButton();
            this.tabDB = new daemonDEV.Windows.Forms.TabStripButton();
            this.tabNotes = new daemonDEV.Windows.Forms.TabStripButton();
            this.toolStripLabel1 = new System.Windows.Forms.ToolStripLabel();
            this.toolStripLabel2 = new System.Windows.Forms.ToolStripLabel();
            this.toolStripLabel3 = new System.Windows.Forms.ToolStripLabel();
            this.mainPanel.SuspendLayout();
            this.statusStrip1.SuspendLayout();
            this.panelBOT.SuspendLayout();
            this.layoutBot.SuspendLayout();
            this.panelChoose.SuspendLayout();
            this.gbxActions.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.gbxBrowser.SuspendLayout();
            this.panelBotSubContainer.SuspendLayout();
            this.panelScriptMode.SuspendLayout();
            this.panelConsoleMode.SuspendLayout();
            this.panelDB.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).BeginInit();
            this.tabMENU.SuspendLayout();
            this.SuspendLayout();
            // 
            // mainPanel
            // 
            this.mainPanel.AutoSize = true;
            this.mainPanel.Controls.Add(this.statusStrip1);
            this.mainPanel.Controls.Add(this.panelBOT);
            this.mainPanel.Controls.Add(this.panelDB);
            this.mainPanel.Controls.Add(this.panelTasks);
            this.mainPanel.Controls.Add(this.tabMENU);
            this.mainPanel.Dock = System.Windows.Forms.DockStyle.Fill;
            this.mainPanel.Location = new System.Drawing.Point(0, 0);
            this.mainPanel.Name = "mainPanel";
            this.mainPanel.Size = new System.Drawing.Size(730, 521);
            this.mainPanel.TabIndex = 2;
            // 
            // statusStrip1
            // 
            this.statusStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsslCache,
            this.tsslPBCache,
            this.tsslWindowName});
            this.statusStrip1.Location = new System.Drawing.Point(123, 499);
            this.statusStrip1.Name = "statusStrip1";
            this.statusStrip1.Size = new System.Drawing.Size(607, 22);
            this.statusStrip1.TabIndex = 7;
            this.statusStrip1.Text = "statusStrip1";
            // 
            // tsslCache
            // 
            this.tsslCache.Name = "tsslCache";
            this.tsslCache.Size = new System.Drawing.Size(40, 17);
            this.tsslCache.Text = "Cache";
            // 
            // tsslPBCache
            // 
            this.tsslPBCache.Name = "tsslPBCache";
            this.tsslPBCache.Size = new System.Drawing.Size(50, 16);
            // 
            // tsslWindowName
            // 
            this.tsslWindowName.Name = "tsslWindowName";
            this.tsslWindowName.Size = new System.Drawing.Size(78, 17);
            this.tsslWindowName.Text = "MainWindow";
            // 
            // panelBOT
            // 
            this.panelBOT.Controls.Add(this.layoutBot);
            this.panelBOT.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelBOT.Location = new System.Drawing.Point(123, 0);
            this.panelBOT.Name = "panelBOT";
            this.panelBOT.Size = new System.Drawing.Size(607, 521);
            this.panelBOT.TabIndex = 6;
            // 
            // layoutBot
            // 
            this.layoutBot.ColumnCount = 2;
            this.layoutBot.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 69.69697F));
            this.layoutBot.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 30.30303F));
            this.layoutBot.Controls.Add(this.txtCommand, 0, 1);
            this.layoutBot.Controls.Add(this.btnSend, 1, 1);
            this.layoutBot.Controls.Add(this.panelChoose, 1, 0);
            this.layoutBot.Controls.Add(this.panelBotSubContainer, 0, 0);
            this.layoutBot.Dock = System.Windows.Forms.DockStyle.Fill;
            this.layoutBot.Location = new System.Drawing.Point(0, 0);
            this.layoutBot.Name = "layoutBot";
            this.layoutBot.RowCount = 3;
            this.layoutBot.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 90.05525F));
            this.layoutBot.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 9.944752F));
            this.layoutBot.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.layoutBot.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.layoutBot.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.layoutBot.Size = new System.Drawing.Size(607, 521);
            this.layoutBot.TabIndex = 4;
            // 
            // btnSend
            // 
            this.btnSend.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSend.Location = new System.Drawing.Point(426, 454);
            this.btnSend.Name = "btnSend";
            this.btnSend.Size = new System.Drawing.Size(178, 43);
            this.btnSend.TabIndex = 3;
            this.btnSend.Text = "SEND";
            this.btnSend.UseVisualStyleBackColor = true;
            // 
            // panelChoose
            // 
            this.panelChoose.Controls.Add(this.gbxActions);
            this.panelChoose.Controls.Add(this.gbxBrowser);
            this.panelChoose.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelChoose.Location = new System.Drawing.Point(426, 3);
            this.panelChoose.Name = "panelChoose";
            this.panelChoose.Size = new System.Drawing.Size(178, 445);
            this.panelChoose.TabIndex = 4;
            // 
            // gbxActions
            // 
            this.gbxActions.Controls.Add(this.tableLayoutPanel2);
            this.gbxActions.Dock = System.Windows.Forms.DockStyle.Top;
            this.gbxActions.Location = new System.Drawing.Point(0, 76);
            this.gbxActions.Name = "gbxActions";
            this.gbxActions.Size = new System.Drawing.Size(178, 246);
            this.gbxActions.TabIndex = 1;
            this.gbxActions.TabStop = false;
            this.gbxActions.Text = "ACTION\'s";
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.ColumnCount = 1;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Controls.Add(this.btnExit, 0, 2);
            this.tableLayoutPanel2.Controls.Add(this.btnLoadScript, 0, 1);
            this.tableLayoutPanel2.Controls.Add(this.btnStart, 0, 0);
            this.tableLayoutPanel2.Controls.Add(this.btnTabs, 0, 3);
            this.tableLayoutPanel2.Controls.Add(this.btnSwitch, 0, 4);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(3, 16);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 5;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 20F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(172, 227);
            this.tableLayoutPanel2.TabIndex = 3;
            // 
            // btnExit
            // 
            this.btnExit.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnExit.Location = new System.Drawing.Point(3, 93);
            this.btnExit.Name = "btnExit";
            this.btnExit.Size = new System.Drawing.Size(166, 39);
            this.btnExit.TabIndex = 1;
            this.btnExit.Text = "EXIT";
            this.btnExit.UseVisualStyleBackColor = true;
            this.btnExit.Click += new System.EventHandler(this.btnExit_Click);
            // 
            // btnLoadScript
            // 
            this.btnLoadScript.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnLoadScript.Location = new System.Drawing.Point(3, 48);
            this.btnLoadScript.Name = "btnLoadScript";
            this.btnLoadScript.Size = new System.Drawing.Size(166, 39);
            this.btnLoadScript.TabIndex = 2;
            this.btnLoadScript.Text = "LOAD SCRIPT";
            this.btnLoadScript.UseVisualStyleBackColor = true;
            this.btnLoadScript.Click += new System.EventHandler(this.btnLoadScript_Click);
            // 
            // btnStart
            // 
            this.btnStart.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnStart.Location = new System.Drawing.Point(3, 3);
            this.btnStart.Name = "btnStart";
            this.btnStart.Size = new System.Drawing.Size(166, 39);
            this.btnStart.TabIndex = 0;
            this.btnStart.Text = "START";
            this.btnStart.UseVisualStyleBackColor = true;
            this.btnStart.Click += new System.EventHandler(this.btnStart_Click);
            // 
            // btnTabs
            // 
            this.btnTabs.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnTabs.Location = new System.Drawing.Point(3, 138);
            this.btnTabs.Name = "btnTabs";
            this.btnTabs.Size = new System.Drawing.Size(166, 39);
            this.btnTabs.TabIndex = 3;
            this.btnTabs.Text = "OPEN TAB";
            this.btnTabs.UseVisualStyleBackColor = true;
            this.btnTabs.Click += new System.EventHandler(this.btnTabs_Click);
            // 
            // btnSwitch
            // 
            this.btnSwitch.Dock = System.Windows.Forms.DockStyle.Fill;
            this.btnSwitch.Location = new System.Drawing.Point(3, 183);
            this.btnSwitch.Name = "btnSwitch";
            this.btnSwitch.Size = new System.Drawing.Size(166, 41);
            this.btnSwitch.TabIndex = 4;
            this.btnSwitch.Text = "SWITCH";
            this.btnSwitch.UseVisualStyleBackColor = true;
            this.btnSwitch.Click += new System.EventHandler(this.btnSwitch_Click);
            // 
            // gbxBrowser
            // 
            this.gbxBrowser.Controls.Add(this.rdIE);
            this.gbxBrowser.Controls.Add(this.rdChrome);
            this.gbxBrowser.Controls.Add(this.rdFirefox);
            this.gbxBrowser.Dock = System.Windows.Forms.DockStyle.Top;
            this.gbxBrowser.Location = new System.Drawing.Point(0, 0);
            this.gbxBrowser.Name = "gbxBrowser";
            this.gbxBrowser.Size = new System.Drawing.Size(178, 76);
            this.gbxBrowser.TabIndex = 4;
            this.gbxBrowser.TabStop = false;
            this.gbxBrowser.Text = "BROWSER\'s";
            // 
            // rdIE
            // 
            this.rdIE.AutoSize = true;
            this.rdIE.Dock = System.Windows.Forms.DockStyle.Top;
            this.rdIE.Location = new System.Drawing.Point(3, 50);
            this.rdIE.Name = "rdIE";
            this.rdIE.Size = new System.Drawing.Size(172, 17);
            this.rdIE.TabIndex = 2;
            this.rdIE.TabStop = true;
            this.rdIE.Text = "IE";
            this.rdIE.UseVisualStyleBackColor = true;
            // 
            // rdChrome
            // 
            this.rdChrome.AutoSize = true;
            this.rdChrome.Dock = System.Windows.Forms.DockStyle.Top;
            this.rdChrome.Location = new System.Drawing.Point(3, 33);
            this.rdChrome.Name = "rdChrome";
            this.rdChrome.Size = new System.Drawing.Size(172, 17);
            this.rdChrome.TabIndex = 1;
            this.rdChrome.TabStop = true;
            this.rdChrome.Text = "CHROME";
            this.rdChrome.UseVisualStyleBackColor = true;
            // 
            // rdFirefox
            // 
            this.rdFirefox.AutoSize = true;
            this.rdFirefox.Dock = System.Windows.Forms.DockStyle.Top;
            this.rdFirefox.Location = new System.Drawing.Point(3, 16);
            this.rdFirefox.Name = "rdFirefox";
            this.rdFirefox.Size = new System.Drawing.Size(172, 17);
            this.rdFirefox.TabIndex = 0;
            this.rdFirefox.TabStop = true;
            this.rdFirefox.Text = "FIREFOX";
            this.rdFirefox.UseVisualStyleBackColor = true;
            // 
            // panelBotSubContainer
            // 
            this.panelBotSubContainer.BackColor = System.Drawing.SystemColors.ActiveCaption;
            this.panelBotSubContainer.Controls.Add(this.panelScriptMode);
            this.panelBotSubContainer.Controls.Add(this.panelConsoleMode);
            this.panelBotSubContainer.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelBotSubContainer.Location = new System.Drawing.Point(3, 3);
            this.panelBotSubContainer.Name = "panelBotSubContainer";
            this.panelBotSubContainer.Size = new System.Drawing.Size(417, 445);
            this.panelBotSubContainer.TabIndex = 5;
            // 
            // panelScriptMode
            // 
            this.panelScriptMode.BackColor = System.Drawing.Color.DeepSkyBlue;
            this.panelScriptMode.Controls.Add(this.txtScriptMode);
            this.panelScriptMode.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelScriptMode.Location = new System.Drawing.Point(0, 0);
            this.panelScriptMode.Name = "panelScriptMode";
            this.panelScriptMode.Size = new System.Drawing.Size(417, 445);
            this.panelScriptMode.TabIndex = 1;
            // 
            // txtScriptMode
            // 
            this.txtScriptMode.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtScriptMode.Location = new System.Drawing.Point(0, 0);
            this.txtScriptMode.Multiline = true;
            this.txtScriptMode.Name = "txtScriptMode";
            this.txtScriptMode.Size = new System.Drawing.Size(417, 445);
            this.txtScriptMode.TabIndex = 0;
            // 
            // panelConsoleMode
            // 
            this.panelConsoleMode.BackColor = System.Drawing.SystemColors.Highlight;
            this.panelConsoleMode.Controls.Add(this.lsbxLog);
            this.panelConsoleMode.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelConsoleMode.Location = new System.Drawing.Point(0, 0);
            this.panelConsoleMode.Name = "panelConsoleMode";
            this.panelConsoleMode.Size = new System.Drawing.Size(417, 445);
            this.panelConsoleMode.TabIndex = 0;
            // 
            // lsbxLog
            // 
            this.lsbxLog.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.lsbxLog.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lsbxLog.Font = new System.Drawing.Font("Microsoft Sans Serif", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lsbxLog.FormattingEnabled = true;
            this.lsbxLog.Location = new System.Drawing.Point(0, 0);
            this.lsbxLog.Name = "lsbxLog";
            this.lsbxLog.Size = new System.Drawing.Size(417, 445);
            this.lsbxLog.TabIndex = 6;
            this.lsbxLog.SelectedIndexChanged += new System.EventHandler(this.lsbxLog_SelectedIndexChanged);
            // 
            // panelDB
            // 
            this.panelDB.Controls.Add(this.button1);
            this.panelDB.Controls.Add(this.btnInsertData);
            this.panelDB.Controls.Add(this.btnGetSqliteData);
            this.panelDB.Controls.Add(this.dataGridView1);
            this.panelDB.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panelDB.Location = new System.Drawing.Point(123, 0);
            this.panelDB.Name = "panelDB";
            this.panelDB.Size = new System.Drawing.Size(607, 521);
            this.panelDB.TabIndex = 99;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(219, 245);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(136, 23);
            this.button1.TabIndex = 3;
            this.button1.Text = "START CONNECTION";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // btnInsertData
            // 
            this.btnInsertData.Location = new System.Drawing.Point(117, 246);
            this.btnInsertData.Name = "btnInsertData";
            this.btnInsertData.Size = new System.Drawing.Size(75, 23);
            this.btnInsertData.TabIndex = 2;
            this.btnInsertData.Text = "INSERT";
            this.btnInsertData.UseVisualStyleBackColor = true;
            this.btnInsertData.Click += new System.EventHandler(this.btnInsertData_Click);
            // 
            // btnGetSqliteData
            // 
            this.btnGetSqliteData.Location = new System.Drawing.Point(7, 246);
            this.btnGetSqliteData.Name = "btnGetSqliteData";
            this.btnGetSqliteData.Size = new System.Drawing.Size(75, 23);
            this.btnGetSqliteData.TabIndex = 1;
            this.btnGetSqliteData.Text = "GETDATA";
            this.btnGetSqliteData.UseVisualStyleBackColor = true;
            this.btnGetSqliteData.Click += new System.EventHandler(this.btnGetSqliteData_Click);
            // 
            // dataGridView1
            // 
            this.dataGridView1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridView1.Location = new System.Drawing.Point(6, 278);
            this.dataGridView1.Name = "dataGridView1";
            this.dataGridView1.Size = new System.Drawing.Size(589, 157);
            this.dataGridView1.TabIndex = 0;
            // 
            // panelTasks
            // 
            this.panelTasks.Location = new System.Drawing.Point(664, 158);
            this.panelTasks.Name = "panelTasks";
            this.panelTasks.Size = new System.Drawing.Size(449, 338);
            this.panelTasks.TabIndex = 5;
            this.panelTasks.Visible = false;
            // 
            // txtCommand
            // 
            this.txtCommand.Dock = System.Windows.Forms.DockStyle.Fill;
            this.txtCommand.Location = new System.Drawing.Point(3, 454);
            this.txtCommand.Multiline = true;
            this.txtCommand.Name = "txtCommand";
            this.txtCommand.Size = new System.Drawing.Size(417, 43);
            this.txtCommand.TabIndex = 1;
            this.txtCommand.KeyPress += new System.Windows.Forms.KeyPressEventHandler(this.txtCommand_KeyPress);
            // 
            // tabMENU
            // 
            this.tabMENU.AutoSize = false;
            this.tabMENU.Dock = System.Windows.Forms.DockStyle.Left;
            this.tabMENU.FlipButtons = false;
            this.tabMENU.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.tabMENU.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tabBOT,
            this.tabTasks,
            this.tabDB,
            this.tabNotes,
            this.toolStripLabel1,
            this.toolStripLabel2,
            this.toolStripLabel3});
            this.tabMENU.Location = new System.Drawing.Point(0, 0);
            this.tabMENU.Name = "tabMENU";
            this.tabMENU.RenderStyle = System.Windows.Forms.ToolStripRenderMode.Professional;
            this.tabMENU.SelectedTab = this.tabDB;
            this.tabMENU.ShowItemToolTips = false;
            this.tabMENU.Size = new System.Drawing.Size(123, 521);
            this.tabMENU.Stretch = true;
            this.tabMENU.TabIndex = 2;
            this.tabMENU.Text = "tabMENU";
            this.tabMENU.UseVisualStyles = true;
            this.tabMENU.SelectedTabChanged += new System.EventHandler<daemonDEV.Windows.Forms.SelectedTabChangedEventArgs>(this.tabStrips_SelectedTabChanged);
            // 
            // tabBOT
            // 
            this.tabBOT.HotTextColor = System.Drawing.SystemColors.ControlText;
            this.tabBOT.Image = ((System.Drawing.Image)(resources.GetObject("tabBOT.Image")));
            this.tabBOT.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tabBOT.IsSelected = false;
            this.tabBOT.Margin = new System.Windows.Forms.Padding(0);
            this.tabBOT.Name = "tabBOT";
            this.tabBOT.Padding = new System.Windows.Forms.Padding(0);
            this.tabBOT.SelectedFont = new System.Drawing.Font("Tahoma", 8.25F);
            this.tabBOT.SelectedTextColor = System.Drawing.SystemColors.ControlText;
            this.tabBOT.Size = new System.Drawing.Size(122, 45);
            this.tabBOT.Text = "BOT";
            this.tabBOT.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            // 
            // tabTasks
            // 
            this.tabTasks.HotTextColor = System.Drawing.SystemColors.ControlText;
            this.tabTasks.Image = global::daemonDEV.beBOT.Properties.Resources.tabTasks;
            this.tabTasks.ImageTransparentColor = System.Drawing.Color.Fuchsia;
            this.tabTasks.IsSelected = false;
            this.tabTasks.Margin = new System.Windows.Forms.Padding(0);
            this.tabTasks.Name = "tabTasks";
            this.tabTasks.Padding = new System.Windows.Forms.Padding(0);
            this.tabTasks.SelectedFont = new System.Drawing.Font("Tahoma", 8.25F);
            this.tabTasks.SelectedTextColor = System.Drawing.SystemColors.ControlText;
            this.tabTasks.Size = new System.Drawing.Size(122, 45);
            this.tabTasks.Text = "TASKS";
            this.tabTasks.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            // 
            // tabDB
            // 
            this.tabDB.Checked = true;
            this.tabDB.HotTextColor = System.Drawing.SystemColors.ControlText;
            this.tabDB.Image = ((System.Drawing.Image)(resources.GetObject("tabDB.Image")));
            this.tabDB.ImageTransparentColor = System.Drawing.Color.Fuchsia;
            this.tabDB.IsSelected = true;
            this.tabDB.Margin = new System.Windows.Forms.Padding(0);
            this.tabDB.Name = "tabDB";
            this.tabDB.Padding = new System.Windows.Forms.Padding(0);
            this.tabDB.SelectedFont = new System.Drawing.Font("Tahoma", 8.25F);
            this.tabDB.SelectedTextColor = System.Drawing.SystemColors.ControlText;
            this.tabDB.Size = new System.Drawing.Size(122, 45);
            this.tabDB.Text = "DB";
            this.tabDB.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            // 
            // tabNotes
            // 
            this.tabNotes.HotTextColor = System.Drawing.SystemColors.ControlText;
            this.tabNotes.Image = ((System.Drawing.Image)(resources.GetObject("tabNotes.Image")));
            this.tabNotes.ImageTransparentColor = System.Drawing.Color.Fuchsia;
            this.tabNotes.IsSelected = false;
            this.tabNotes.Margin = new System.Windows.Forms.Padding(0);
            this.tabNotes.Name = "tabNotes";
            this.tabNotes.Padding = new System.Windows.Forms.Padding(0);
            this.tabNotes.SelectedFont = new System.Drawing.Font("Tahoma", 8.25F);
            this.tabNotes.SelectedTextColor = System.Drawing.SystemColors.ControlText;
            this.tabNotes.Size = new System.Drawing.Size(122, 45);
            this.tabNotes.Text = "Notes";
            this.tabNotes.TextImageRelation = System.Windows.Forms.TextImageRelation.ImageAboveText;
            // 
            // toolStripLabel1
            // 
            this.toolStripLabel1.AutoSize = false;
            this.toolStripLabel1.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripLabel1.Image = global::daemonDEV.beBOT.Properties.Resources.BeBOT_logo;
            this.toolStripLabel1.ImageAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.toolStripLabel1.ImageScaling = System.Windows.Forms.ToolStripItemImageScaling.None;
            this.toolStripLabel1.Margin = new System.Windows.Forms.Padding(0);
            this.toolStripLabel1.Name = "toolStripLabel1";
            this.toolStripLabel1.Overflow = System.Windows.Forms.ToolStripItemOverflow.Never;
            this.toolStripLabel1.Size = new System.Drawing.Size(122, 200);
            this.toolStripLabel1.TextAlign = System.Drawing.ContentAlignment.TopCenter;
            // 
            // toolStripLabel2
            // 
            this.toolStripLabel2.Name = "toolStripLabel2";
            this.toolStripLabel2.Size = new System.Drawing.Size(122, 15);
            this.toolStripLabel2.Text = "I\'m BeBOT";
            // 
            // toolStripLabel3
            // 
            this.toolStripLabel3.Name = "toolStripLabel3";
            this.toolStripLabel3.Size = new System.Drawing.Size(122, 15);
            this.toolStripLabel3.Text = "by @daemonDEV";
            // 
            // beBOT
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(730, 521);
            this.Controls.Add(this.mainPanel);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "beBOT";
            this.Text = "beBOT - Automatic WebPage\'s Navigator";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.beBOTForm_FormClosing);
            this.Load += new System.EventHandler(this.beBOT_Load);
            this.mainPanel.ResumeLayout(false);
            this.mainPanel.PerformLayout();
            this.statusStrip1.ResumeLayout(false);
            this.statusStrip1.PerformLayout();
            this.panelBOT.ResumeLayout(false);
            this.layoutBot.ResumeLayout(false);
            this.layoutBot.PerformLayout();
            this.panelChoose.ResumeLayout(false);
            this.gbxActions.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.gbxBrowser.ResumeLayout(false);
            this.gbxBrowser.PerformLayout();
            this.panelBotSubContainer.ResumeLayout(false);
            this.panelScriptMode.ResumeLayout(false);
            this.panelScriptMode.PerformLayout();
            this.panelConsoleMode.ResumeLayout(false);
            this.panelDB.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridView1)).EndInit();
            this.tabMENU.ResumeLayout(false);
            this.tabMENU.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private TabStrip tabMENU;
        private TabStripButton tabBOT;
        private TabStripButton tabTasks;
        private TabStripButton tabNotes;
        private Panel mainPanel;
        private Panel panelTasks;
        private ToolStripLabel toolStripLabel1;
        private ToolStripLabel toolStripLabel2;
        private StatusStrip statusStrip1;
        private ToolStripStatusLabel tsslWindowName;
        private ToolStripStatusLabel tsslCache;
        private ToolStripProgressBar tsslPBCache;
        private TabStripButton tabDB;
        private ToolStripLabel toolStripLabel3;
        private Panel panelBOT;
        private TableLayoutPanel layoutBot;
        //private TextBox txtCommand;
        private AutoCompleteTextBox txtCommand;
        private Button btnSend;
        private Panel panelChoose;
        private GroupBox gbxActions;
        private TableLayoutPanel tableLayoutPanel2;
        private Button btnExit;
        private Button btnLoadScript;
        private Button btnStart;
        private Button btnTabs;
        private Button btnSwitch;
        private GroupBox gbxBrowser;
        private RadioButton rdIE;
        private RadioButton rdChrome;
        private RadioButton rdFirefox;
        private Panel panelBotSubContainer;
        private Panel panelScriptMode;
        private Panel panelConsoleMode;
        private ListBox lsbxLog;
        private TextBox txtScriptMode;
        private Panel panelDB;
        private Button btnGetSqliteData;
        private DataGridView dataGridView1;
        private Button btnInsertData;
        private Button button1;


    }
}

