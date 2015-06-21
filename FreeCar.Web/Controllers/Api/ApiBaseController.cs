using FreeCar.DataAccess;
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
        protected EntityContext _db;

        public ApiBaseController(EntityContext context) 
        {
            _db = context;
        }
    }
}