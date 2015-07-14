using FreeCar.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class CarController : ApiBaseController
    {
		public CarController(EntityContext db) : base(db) { }

        // GET: Order
        public object GetCars()
        {
            var cars = _db.Cars.ToList();
            return new { cars };
        }
    }
}