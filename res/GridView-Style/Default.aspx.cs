using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!IsPostBack)
        {
            BindData();
        }
    }
    protected void BindData()
    { 
        DataSet ds = new DataSet();
        try
        {
            ds.ReadXml(Server.MapPath("EmployeeDetails.xml"));
            if (ds != null && ds.HasChanges())
            {
                gvEmployee.DataSource = ds;
                gvEmployee.DataBind();
            }
            else
            {
                gvEmployee.DataBind();
            }
        }
        catch (Exception ex)
        { 
        }
    }

    protected void gvEmployee_PageIndexChanging(object sender, GridViewPageEventArgs e)
    {
        gvEmployee.PageIndex = e.NewPageIndex;
        BindData();
    }
}
