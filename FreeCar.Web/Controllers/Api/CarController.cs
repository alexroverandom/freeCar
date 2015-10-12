using FreeCar.DataAccess;
using FreeCar.Web.FreeCarService;
using FreeCar.Web.Models.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class CarController : ApiBaseController
    {
        [HttpGet]
        public object GetCars()
        {
			var cars = CarService.GetActiveCars();
            return new { cars };
        }

		[HttpPost]
		public object CarReadyToWork(DriverDto req) 
		{
			return new { };
		}
    }
}