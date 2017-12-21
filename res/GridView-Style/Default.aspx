<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="Gridstyle.css" rel="stylesheet" type="text/css" />
    <title>GridView Style</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <asp:GridView ID="gvEmployee" runat="server" AutoGenerateColumns="false" Width="600px" 
                      AllowPaging="true" PageSize="8" OnPageIndexChanging="gvEmployee_PageIndexChanging"
                      CssClass="Grid"                     
                      AlternatingRowStyle-CssClass="alt"
                      PagerStyle-CssClass="pgr" >         
         <Columns>
         <asp:BoundField DataField="empid" HeaderText="Employee ID" />
         <asp:BoundField DataField="name" HeaderText="Name" />
         <asp:BoundField DataField="designation" HeaderText="Designation" />
         <asp:BoundField DataField="city" HeaderText="City" />
         <asp:BoundField DataField="country" HeaderText="Country" />         
         </Columns>
        </asp:GridView>
    </div>         
    <div style="padding-left:250px"><b>Demo by dotnetfox</b></div>
    </form>
</body>
</html>
