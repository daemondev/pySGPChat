using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace daemonDEV.beBOT
{
    public partial class splash : Form {
        public splash() {
            this.BackColor = Color.LimeGreen;
            this.TransparencyKey = Color.LimeGreen;            
            InitializeComponent();
            splashProgressBar.BackColor = Color.LimeGreen;
            t = new Timer();
            t.Tick += new EventHandler(t_Tick);
            t.Interval = 10;
            splashProgressBar.Value = 1;
        }

        void t_Tick(object sender, EventArgs e) {
            if ((splashProgressBar.Value + splashProgressBar.Value) > 100) {
                splashProgressBar.Value = 100;
            }else {
                splashProgressBar.Value += splashProgressBar.Value;
            }
            
            if (splashProgressBar.Value.Equals(100)) {
                t.Stop();
                t1.Start();                
            }            
        }
        
        Timer t, t1 = new Timer();

        private void splash_Load(object sender, EventArgs e) {
            t.Start();
            t1.Tick += new EventHandler(t1_Tick);
            t1.Interval = 1000;
            
        }

        private void t1_Tick(object sender, EventArgs e){
            t1.Stop();
            this.Hide();
            new beBOT().Show();
        }
    }
}
