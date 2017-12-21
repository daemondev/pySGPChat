using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace daemonDEV.beBOT {
    
    public class AutoCompleteTextBox : System.Windows.Forms.TextBox {

    private string[] database;
    private bool changingText = false;

    protected override void OnTextChanged (EventArgs e) {
        if(!changingText && database != null) {
            
            string typed = this.Text.Substring(0,this.SelectionStart);
            string candidate = null;
            for(int i = 0; i < database.Length; i++)
                if(database[i].Substring(0,this.SelectionStart) == typed) {
                    candidate = database[i].Substring(this.SelectionStart,database[i].Length);
                    break;
                }
            if(candidate != null) {
                changingText = true;
                this.Text = typed+candidate;
                this.SelectionStart = typed.Length;
                this.SelectionLength = candidate.Length;
            }
        }
        else if(changingText)
            changingText = false;
        base.OnTextChanged(e);
    }

}
}
