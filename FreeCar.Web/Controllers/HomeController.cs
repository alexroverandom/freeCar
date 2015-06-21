using FreeCar.DataAccess;
using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class HomeController : Controller
    {
        private EntityContext _db = new EntityContext();
        public ActionResult Index()
        {

            var car = new Car()
            {
                Name = "Carl",

            };
            _db.Cars.Add(car);
            _db.SaveChanges();
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