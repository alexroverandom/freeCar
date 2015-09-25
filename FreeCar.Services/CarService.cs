using FreeCar.DataAccess;
using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Services
{
	public class CarService: ICarService
	{
		private EntityContext _db;

		public CarService(EntityContext db) 
		{
			_db = db;
		}

		public List<Car> GetActiveCars()
		{
			return _db.Histories.Where(h => h.IsReady).Select(h => h.Car).ToList();
		}
	}
}
