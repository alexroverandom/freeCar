using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Services
{
	[ServiceContract]
	public interface IFreeCarService
	{
		[OperationContract]
		List<Car> GetActiveCars();

		[OperationContract]
		List<Car> GetCars();

		[OperationContract]
		List<Order> GetOrders(string clientId);

		[OperationContract]
		Order CreateOrder(OrderRequest orderReq, string clientId = null);

		[OperationContract]
		List<Driver> GetDrivers();
	}
}
