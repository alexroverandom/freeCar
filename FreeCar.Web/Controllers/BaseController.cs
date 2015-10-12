using FreeCar.DataAccess;
using FreeCar.Web.FreeCarService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers
{
    public class BaseController : Controller
    {
		private FreeCarServiceClient _service;
		public FreeCarServiceClient CarService { get { return _service; } }

		public BaseController()
		{
			_service = new FreeCarServiceClient("NetTcpBinding_IFreeCarService");
		}
    }
}