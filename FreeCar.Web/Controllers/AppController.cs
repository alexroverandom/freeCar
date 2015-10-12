using FreeCar.DataAccess;
using FreeCar.Web.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class AppController : BaseController
    {
        // GET: App
        public ActionResult Index()
        {
			var vm = new LayoutViewModel()
			{
				Cars = CarService.GetActiveCars()
				//Cars = CarService
			};
            return View(vm);
        }
    }
}