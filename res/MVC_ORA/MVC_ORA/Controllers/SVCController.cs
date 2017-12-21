using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_ORA.Controllers
{
    public class SVCController : Controller
    {
        // GET: SVC
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public string btnGuardar(string nombre, string apPat, string apMat, decimal sueldo) {
            string res = "";
            try{
                res = X.X.set("insUsuario", nombre, apPat, apMat, sueldo);
            }catch (Exception ex){
                res = ex.Message;
            }
            return res;
        }
    }
}