using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace daemonDEV.beBOT
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            //Application.Run(new beBOT());
            //Application.Run(new test());
            Application.Run(new splash());
            //Application.Run(new beBOT());
            //Application.Run(new daemonDEV.BeBOT.beBOTForm());

        }
    }
}
