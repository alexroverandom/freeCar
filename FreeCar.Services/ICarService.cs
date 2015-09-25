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
	public interface ICarService
	{
		[OperationContract]
		public List<Car> GetActiveCars();
	}
}
