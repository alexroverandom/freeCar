using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Services
{
	public partial class FreeCarService: IFreeCarService
	{
		public List<Order> GetOrders(string clientId)
		{
			return _db.Orders.Where(o => o.ClientId == clientId).ToList();
		}

		public Order CreateOrder(OrderRequest orderReq, string clientId = null)
		{
			var order = new Order
			{
				ClientId = clientId,
				Date = DateTime.Now,
				Cars = new List<OrderedCar>() 
				{
					new OrderedCar()
					{
						
					}
				}
			};
			return order;
		}
	}
}
