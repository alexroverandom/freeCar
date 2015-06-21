using FreeCar.DataAccess;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FreeCar.Web.Controllers.Api
{
    public class OrderController : ApiBaseController
    {
        public OrderController(EntityContext db): base(db) { }

        // GET: Order
        public object GetOrders()
        {
            var orders = _db.Orders.ToList();
            return new { orders };
        }
    }
}