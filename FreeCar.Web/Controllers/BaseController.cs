using FreeCar.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class BaseController : Controller
    {
		protected EntityContext Db;

		public BaseController(EntityContext db)
		{
			Db = db;
		}
    }
}