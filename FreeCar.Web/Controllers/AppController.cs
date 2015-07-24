using FreeCar.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class AppController : BaseController
    {
		public AppController(EntityContext db) : base(db) { }
        // GET: App
        public ActionResult Index()
        {
            return View();
        }
    }
}