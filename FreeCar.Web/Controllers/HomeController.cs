using FreeCar.DataAccess;
using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class HomeController : BaseController
    {
        //private EntityContext _db = new EntityContext();

        public ActionResult Index()
        {
			var car = CarService.GetActiveCars().FirstOrDefault();

            return View(car);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}