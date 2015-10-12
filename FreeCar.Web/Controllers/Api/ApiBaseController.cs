using FreeCar.DataAccess;
using FreeCar.Web;
using FreeCar.Web.FreeCarService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class ApiBaseController : ApiController
    {
		private FreeCarServiceClient _service;
		public FreeCarServiceClient CarService { get { return _service; } }

		public ApiBaseController() 
        {
			_service = new FreeCarServiceClient("NetTcpBinding_IFreeCarService");
        }
    }
}