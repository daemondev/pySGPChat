using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_ORA.Controllers
{
    public class IndexController : Controller
    {
        // GET: Index
        public ActionResult Index()
        {
            string res = X.X.getJSON("getUsuarios");
            ViewData["res"] = res;
            return View();
        }
    }
}