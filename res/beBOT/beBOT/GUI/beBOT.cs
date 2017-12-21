using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;
using OpenQA.Selenium;
using OpenQA.Selenium.Remote;
using OpenQA.Selenium.IE;
using OpenQA.Selenium.Firefox;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.PhantomJS;


namespace daemonDEV.beBOT
{
    public partial class beBOT : Form
    {
        //IJavaScriptExecutor
        public IWebDriver driver;
        List<string> availableCommands;
        List<string> jQueryCommand;
        Dictionary<string, string> programVars;
        //List<string> startCommands = new List<string> { 
        //    "go","find"
        //};
        Dictionary<string, string> searchMethod;
        public beBOT()
        {
            InitializeComponent();
            tabStrips_SelectedTabChanged(null, new daemonDEV.Windows.Forms.SelectedTabChangedEventArgs(null));
            availableCommands = new List<string>();
            jQueryCommand = new List<string>();

            programVars = new Dictionary<string, string>();            
            goNavigateShortcuts = new Dictionary<string, string>();
            tagNameWithValueOrText = new Dictionary<string, string>();

            jQueryCommand.Add("#");
            jQueryCommand.Add(".");
            jQueryCommand.Add("@");
            jQueryCommand.Add("$");
            jQueryCommand.Add("*");

            availableCommands.Add("find");
            availableCommands.Add("go");

            tagNameWithValueOrText.Add("input", "value");
            tagNameWithValueOrText.Add("textarea", "value");

            tagNameWithValueOrText.Add("div", "text");
            tagNameWithValueOrText.Add("span", "text");
            tagNameWithValueOrText.Add("a", "text");
            tagNameWithValueOrText.Add("li", "text");

            availableCommands.AddRange(jQueryCommand);
            searchMethod = new Dictionary<string, string>();
            searchMethod.Add("#", "Id");
            searchMethod.Add(".", "ClassName");
            searchMethod.Add("@", "Name");
            searchMethod.Add("*", "DataAttr");
            searchMethod.Add("$", "other");

            goNavigateShortcuts.Add("google", "https://www.google.com.pe");
            goNavigateShortcuts.Add("elcomercio", "http://elcomercio.pe");
            goNavigateShortcuts.Add("facebook", "https://www.facebook.com");

            //this.TopMost = true;
            //this.GotFocus += new EventHandler(beBOTForm_GotFocus);
            //this.Leave += new EventHandler(beBOTForm_Leave);
            //this.Enter += new EventHandler(beBOTForm_Enter);
            //this.Deactivate += new EventHandler(beBOTForm_Deactivate);
            //this.Activated += new EventHandler(beBOTForm_Activated);
            bw = new BackgroundWorker();
            bw.DoWork += new DoWorkEventHandler(bw_DoWork);
            bw.RunWorkerCompleted += bw_RunWorkerCompleted;
            bw.WorkerSupportsCancellation = true;
            tsslPBCache.Style = ProgressBarStyle.Marquee;
            tsslPBCache.Step = 90;
            tabBOT.IsSelected = true;
            changeMode();
                                 
        }

        void bw_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e) {
            
        }
        Dictionary<string, string> withIDElements, withNameElements, withClassNameElements, goNavigateShortcuts, tagNameWithValueOrText;
                
        void bw_DoWork(object sender, DoWorkEventArgs e) {
            withIDElements = new Dictionary<string, string>();
            //withNameElements = new Dictionary<string, string>();
            //withClassNameElements = new Dictionary<string, string>();
            string tagName = "";
            foreach (var item in driver.FindElements(By.XPath("//*[@id]"))){
                tagName = item.TagName.ToLower();
                if (tagNameWithValueOrText.ContainsKey(tagName)){
                    if (withIDElements.ContainsKey(item.GetAttribute("id"))){
                        if (tagNameWithValueOrText[tagName].Equals("value")){
                            withIDElements[item.GetAttribute("id")] = item.GetAttribute("value");
                        }else if (tagNameWithValueOrText[tagName].Equals("text")){                            
                            withIDElements[item.GetAttribute("id")] = item.Text;
                        }
                    } else {
                        if (tagNameWithValueOrText[tagName].Equals("value")){
                            withIDElements.Add(item.GetAttribute("id"), item.GetAttribute("value"));
                        }else if (tagNameWithValueOrText[tagName].Equals("text")){
                            withIDElements.Add(item.GetAttribute("id"), item.Text);
                        }
                    }                    
                }                
            }
        }

        BackgroundWorker bw;

        #region transparency

        void beBOTForm_Activated(object sender, EventArgs e)
        {
            disableTransparent();
        }

        void beBOTForm_Deactivate(object sender, EventArgs e){
            setTransparent();
        }

        void beBOTForm_Enter(object sender, EventArgs e)
        {
            disableTransparent();
        }

        void beBOTForm_Leave(object sender, EventArgs e)
        {
            setTransparent();
        }

        void beBOTForm_GotFocus(object sender, EventArgs e)
        {
            throw new NotImplementedException();
        }

        public void setTransparent(){
            this.BackColor = Color.LimeGreen;
            this.TransparencyKey = Color.LimeGreen;
            lsbxLog.BackColor = Color.LimeGreen;
        }
        public void disableTransparent()
        {
            this.BackColor = System.Drawing.SystemColors.ControlText;
            //this.btnSend.UseVisualStyleBackColor = true;
            this.TransparencyKey = System.Drawing.SystemColors.ControlText;
            lsbxLog.BackColor = System.Drawing.SystemColors.ControlText;
        }

        #endregion
        
        public IWebElement wEl;
        private void tabStrips_SelectedTabChanged(object sender, daemonDEV.Windows.Forms.SelectedTabChangedEventArgs e) {           
            string tabName = tabMENU.SelectedTab.Name;             
            if (tabName.Equals("tabBOT")){
                panelTasks.Visible = false;
                panelBOT.Visible = true;
                panelDB.Hide();
            } else if (tabName.Equals("tabTasks")){
                panelTasks.Visible = true;
                panelBOT.Visible = false;
                panelDB.Hide();
            } else if (tabName.Equals("tabNotes")){
                panelTasks.Visible = false;
                panelBOT.Visible = false;
                panelDB.Hide();
            } else if (tabName.Equals("tabDB")){
                panelDB.Show();
                panelTasks.Visible = false;
                panelBOT.Visible = false;
            }
        }

        void startBOT() {
            if (rdFirefox.Checked){
                FirefoxDriverService driverService = FirefoxDriverService.CreateDefaultService();
                driverService.HideCommandPromptWindow = true;
                driver = new FirefoxDriver(driverService);
            } else if (rdChrome.Checked) {
                ChromeDriverService driverService = ChromeDriverService.CreateDefaultService();
                driverService.HideCommandPromptWindow = true;
                driver = new ChromeDriver(driverService);
            } else {
                InternetExplorerDriverService driverService = InternetExplorerDriverService.CreateDefaultService();
                driverService.HideCommandPromptWindow = true;
                driver = new InternetExplorerDriver(driverService);
            }

            lsbxLog.Items.Add("beBOT READY!!!");
        }

        private void btnStart_Click(object sender, EventArgs e){
            if (switchConsoleMode) {
                startBOT();
            } else {
                string command = txtScriptMode.Text.Trim();
                if (!command.Equals("")) {
                    foreach (var line in command.Split('\n')) {
                        //MessageBox.Show(line);
                        //preprocessCommand(line);
                        bootCommand(line.Replace("\r","").Trim());
                    }
                }
            }
        }

        void bootCommand(params string[] command) {
            string rawCommandText = txtCommand.Text.Trim();
            if (command.Length > 0) rawCommandText = command[0];
            
            txtCommand.Text = "";
            if (rawCommandText.Equals("exit") || rawCommandText.Equals("EXIT"))
            {
                exitBOT();
            }
            else if (rawCommandText.ToLower().Equals("start"))
            {
                startBOT();
                return;
            }
            processCommand(rawCommandText);
        }

        //Use below logic to switch to second tab.
        //new Actions(driver).sendKeys(driver.findElement(By.tagName("html")), Keys.CONTROL).sendKeys(driver.findElement(By.tagName("html")),Keys.NUMPAD2).build().perform();
        //In the same manner you can switch back to first tab again
        //new Actions(driver).sendKeys(driver.findElement(By.tagName("html")), Keys.CONTROL).sendKeys(driver.findElement(By.tagName("html")),Keys.NUMPAD1).build().perform();

        void preprocessCommand(object sender, EventArgs e){
            bootCommand();
        }        

        private bool find(string id, out IWebElement wEl) {            
            wEl = driver.FindElement(By.Name(id));            
            return (wEl != null);
        }

        private bool find(string by, string criteria, out IWebElement wEl, out string error){
            wEl = null;
            error = "";
            try { 
                if (by.Equals("Id")){
                    wEl = driver.FindElement(By.Id(criteria));
                }else if (by.Equals("Name")){
                    wEl = driver.FindElement(By.Name(criteria));
                }else if (by.Equals("ClassName")){
                    wEl = driver.FindElement(By.ClassName(criteria));
                }else if (by.Equals("DataAttr")) {
                    wEl = driver.FindElement(By.CssSelector(criteria));
                }          
            }catch(Exception ex){
                error = ex.Message;
            }            
            
            return (wEl != null);
        }

        public bool isJquerySyntax(out bool isJQueryMode, out int part, params string[] command) {
            isJQueryMode = false;
            part = 0;
            for (int i = 0; i < command.Length; i++ ){
                part = i;
                string startWithJqueryMode = command[i][0].ToString();
                if (jQueryCommand.Contains(startWithJqueryMode) && command[i].Length > 1) {
                    isJQueryMode = true;
                    break;
                }
            }

            return isJQueryMode;
        }

        public string[] getJQueryParts(string command){
            if(command.StartsWith(".")){
                command = command.Substring(1, command.Length -1);
            }
            return command.Split('.');
        }

        public string getValueFromTagName() { 
            if(tagNameWithValueOrText[wEl.TagName.ToLower()].Equals("text")){
                return wEl.Text;
            }else{
                return wEl.GetAttribute("value");
            }
        }

        void processCommand(string rawCommandText)  {
            if(driver == null) return;
            
            string[] splittedCommands = rawCommandText.Split(' ');
            int commandParts = splittedCommands.Length;
            string initCommand = splittedCommands[0].Trim();

            string firstChar = initCommand[0].ToString();
            bool isJQueryMode = false;
            int part = 0;
            if (availableCommands.Contains(initCommand) || isJquerySyntax(out isJQueryMode, out part, initCommand, (commandParts > 1 ? (splittedCommands[1].Equals("=") ? splittedCommands[2] : splittedCommands[1]) : "dummy"))) {
                
                if(isJQueryMode){
                    string commandToProcess = initCommand;
                    if(!part.Equals(0)){
                        commandToProcess = (commandParts > 1 ? (splittedCommands[1].Equals("=") ? splittedCommands[2] : splittedCommands[1]) : initCommand);
                    }
                    
                    string[] splitOneCommand = getJQueryParts(commandToProcess);
                    string criteria = splitOneCommand[0];
                    string property = splitOneCommand[1];
                    if(!initCommand.StartsWith(".")){
                        criteria = criteria.Substring(1, criteria.Length - 1);
                    }
                    

                    if(commandParts.Equals(1)){                        
                        runJQueryCommand(searchMethod[firstChar], criteria, property);                       
                    }else if(commandParts > 1){
                        if (!part.Equals(0)){
                            if (property.Equals("val") || property.Equals("value")){
                                string error = "";
                                find(searchMethod[commandToProcess[0].ToString()],criteria, out wEl, out error);
                                if(wEl != null){
                                    if (programVars.ContainsKey(initCommand)) {
                                        //programVars[initCommand] = wEl.GetAttribute("value");
                                        programVars[initCommand] = getValueFromTagName();
                                    }else {
                                        programVars.Add(initCommand, getValueFromTagName());
                                    }                                    
                                }
                                
                            }                            
                        } else {
                            string value = "";
                            if(splittedCommands[1].Equals("=")){
                                value = splittedCommands[2];
                            }else{
                                value = splittedCommands[1];
                            }
                            runJQueryCommand(searchMethod[firstChar], criteria, property, value);                       
                        }
                    }
                } else{
                    switch (initCommand) {
                        case "find":
                            if (find(splittedCommands[1], out wEl)){
                                wEl.SendKeys("linux");
                            }
                            break;
                        case "go":                            
                            string urlToNavigate = splittedCommands[1];
                            if (goNavigateShortcuts.ContainsKey(urlToNavigate)){
                                urlToNavigate = goNavigateShortcuts[urlToNavigate];
                            }else if (!urlToNavigate.StartsWith("http")){
                                urlToNavigate = string.Concat("http://", urlToNavigate);
                            }
                            driver.Navigate().GoToUrl(urlToNavigate);
                            tsslWindowName.Text = driver.Title;
                            //if (!bw.IsBusy) {                                
                            //    bw.RunWorkerAsync(driver);
                            //} 
                            
                            break;
                        default:
                            break;
                    }                    
                }
                //txtLog.AppendText(string.Concat(rawCommandText, "\r\n"));
                lsbxLog.Items.Add(rawCommandText);
            }else{
                if (programVars.ContainsKey(initCommand)) {                    
                    lsbxLog.Items.Add(string.Concat(initCommand, ": ", programVars[initCommand]));
                } else {
                    //programVars.Add(initCommand, wEl.GetAttribute("value"));
                }                                    
            }
        }

        private void runJQueryCommand(string pSearchMethod, params string[] parameters) {

            string criteria = parameters[0];
            string property = parameters[1];
            string value = "";
            bool haveValue = false;
            if(parameters.Length.Equals(3)){
                value = parameters[2];
                haveValue = true;
            }
            //IWebElement wEL = null;
            wEl = null;
            string error = "";
            /*try{/*
                if (pSearchMethod.Equals("Id")){
                    wEl = driver.FindElement(By.Id(criteria));
                } else if (pSearchMethod.Equals("Name")) {
                    wEl = driver.FindElement(By.Name(criteria));
                } else if (pSearchMethod.Equals("ClassName")) {
                    wEl = driver.FindElement(By.ClassName(criteria));
                }//*/
                find(pSearchMethod, criteria, out wEl, out error);
            //}catch (Exception ex){
                //driver.FindElements(By.TagName("frame"));
               
                
            //}

                if (wEl != null) {
                    string action = property.ToLower();
                    if (action.Equals("click") || action.Equals("clic")){
                        wEl.Click();
                    }else if (action.Equals("clear")){
                        wEl.Clear();
                    }else if ((action.Equals("value") || action.Equals("val")) && haveValue) {
                        wEl.SendKeys(value);
                    }
                }else {
                    lsbxLog.Items.Add("FAIL: " + error);
                }           
        }

        string commandSuccessful = "";

        public void exitBOT(){
            if (driver != null){
                try{
                    driver.Close();
                }
                catch { }
            }

            System.Diagnostics.Process[] localAll = System.Diagnostics.Process.GetProcesses();
            string processName = "";
            foreach (System.Diagnostics.Process item in localAll){
                processName = item.ProcessName;
                if (processName.StartsWith("IEDriverServer") || processName.StartsWith("iexplore") || processName.StartsWith("chromedriver") || processName.StartsWith("geckodriver")){
                    try{
                        System.Diagnostics.Process.GetProcessById(item.Id).Kill();
                    }catch { }
                }
                //txtLog.AppendText(string.Concat(item.ProcessName, " - ", item.Id.ToString(), "\r\n"));
                lsbxLog.Items.Add(string.Concat(item.ProcessName, " - ", item.Id.ToString()));
            }
            Application.Exit();
        }

        private void btnExit_Click(object sender, EventArgs e) {
            exitBOT();
        }

        private void txtCommand_KeyPress(object sender, KeyPressEventArgs e) {
            if (Convert.ToInt32(e.KeyChar).Equals(13) && !txtCommand.Text.Trim().Equals("")) {                
                preprocessCommand(sender, e);
            }
        }

        private void beBOT_Load(object sender, EventArgs e){
            txtCommand.Focus(); 
            X.createDBifNotExists();


            AutoCompleteStringCollection coll = new AutoCompleteStringCollection();
            coll.AddRange(availableCommands.ToArray());           

            txtCommand.AutoCompleteCustomSource = coll;
            txtCommand.AutoCompleteMode = AutoCompleteMode.Suggest;   
            txtCommand.AutoCompleteSource = AutoCompleteSource.CustomSource;
            
            
        }

        private void initDebugActions() {         
        
        }


        private void lsbxLog_SelectedIndexChanged(object sender, EventArgs e) {
            //string oldCommand = lsbxLog.SelectedValue.ToString();
            //MessageBox.Show("test: " + lsbxLog.SelectedIndex.ToString());
            if (lsbxLog.SelectedItem != null){
                string oldCommand = lsbxLog.SelectedItem.ToString();
                if (!oldCommand.Trim().Equals("")) {
                    processCommand(oldCommand);
                }
            }
                        
        }
        String mainWindowHandle;
        private void btnTabs_Click(object sender, EventArgs e) {
            /*driver.Navigate().GoToUrl("http://google.com");
            driver.FindElement(By.CssSelector("body")).SendKeys( OpenQA.Selenium.Keys.Control + "t");            
            List<string> tabs = new List<string>(driver.WindowHandles);            
            lsbxLog.Items.Add(tabs.Count);
            driver.SwitchTo().Window(tabs[0]);
            driver.Navigate().GoToUrl("http://bing.com");            //*/
            /*
            IJavaScriptExecutor jscript = driver as IJavaScriptExecutor;
            for (int i = 0; i < 1; i++){

                driver.Navigate().GoToUrl("https://www.google.com.pe");
                jscript.ExecuteScript("window.open('{0}', '_blank');", "https://www.google.com.pe");
            }//*/
            

            
        }
        protected override void OnPaintBackground(PaintEventArgs e)
        {
            e.Graphics.FillRectangle(Brushes.LimeGreen, e.ClipRectangle);
        }
        private void btnSwitch_Click(object sender, EventArgs e) {
            /*driver.Navigate().GoToUrl("http://bing.com");
            driver.SwitchTo().Window(mainWindowHandle);
            driver.FindElement(By.CssSelector("body")).SendKeys( OpenQA.Selenium.Keys.Control+ "\t");
            driver.SwitchTo().DefaultContent(); //*/
            
            /*
            for (int i = 0; i < driver.WindowHandles.Count; i++){
                driver.SwitchTo().Window(driver.WindowHandles[i]);
                MessageBox.Show(driver.WindowHandles[i]);
            } //*/

            /*
            foreach (var item in driver.FindElements(By.TagName("frame")))
            {
                MessageBox.Show(item.GetAttribute("name"));
            }//*/

            /**/
            //driver.SwitchTo().Frame("main");       
            /*
            foreach (var item in programVars)
            {
                MessageBox.Show(item.Key + " - " + item.Value);
            }//*/

            changeMode();

            //setTransparent();
        }

        void changeMode() {
            if (switchConsoleMode){
                panelConsoleMode.Hide();
                panelScriptMode.Show();
                switchConsoleMode = false;
                this.Text = string.Concat(Ngine.title, " - ", "SCRIPT MODE");
            }else{
                panelConsoleMode.Show();
                panelScriptMode.Hide();
                switchConsoleMode = true;
                this.Text = string.Concat(Ngine.title, " - ", "CONSOLE MODE");
            }
        }

        bool switchConsoleMode = false;
        private void beBOTForm_FormClosing(object sender, FormClosingEventArgs e) {
            exitBOT();
        }

        private void btnGetSqliteData_Click(object sender, EventArgs e)
        {
            //dataGridView1.DataSource = X.getCities();
            dataGridView1.DataSource = XMongo.getScripts();
        }

        private void btnInsertData_Click(object sender, EventArgs e)
        {
            X.insertData();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
        }

        private void btnLoadScript_Click(object sender, EventArgs e)
        {
            string command = txtScriptMode.Text;
            //X.insertScript(command);
            //XMongo mongo = new XMongo();
            XMongo.insertScript(txtScriptMode.Text);
            XMongo.getScripts();
        }
        
    }
}