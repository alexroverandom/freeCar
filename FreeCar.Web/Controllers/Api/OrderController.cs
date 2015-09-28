using FreeCar.DataAccess;
using FreeCar.Entities;
using FreeCar.Web.Models.Dtos;
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

		[HttpPost]
		public object NewOrder(OrderDto req) 
		{


			return new object { };
		}

		public object OrderRequest(RequestDto req)
		{
			var request = new OrderRequest
			{
				Class = req.Class,
				Period = req.Period,
				StartPoint = req.StartPoint,
				EndPoint = req.EndPoint,
				RoutePoints = req.RoutePoints
			};
			//var drivers = Get
			return new object { };
		}
    }
}