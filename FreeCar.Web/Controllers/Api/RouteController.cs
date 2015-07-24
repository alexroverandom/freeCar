using FreeCar.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class RouteController : ApiBaseController
    {
		public RouteController(EntityContext context) : base(context) { }

        // GET: Route
        public object Index()
        {
            return new {};
        }
    }
}