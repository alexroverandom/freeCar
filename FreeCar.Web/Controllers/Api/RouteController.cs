using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class RouteController : ApiBaseController
    {
        // GET: Route
        public ActionResult Index()
        {
            return View();
        }
    }
}