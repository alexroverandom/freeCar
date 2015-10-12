using FreeCar.DataAccess;
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
		public List<Car> GetCars()
		{
			return _db.Cars.ToList();
		}
	}
}
