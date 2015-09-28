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
		private EntityContext _db;

		public FreeCarService(EntityContext db) 
		{
			_db = db;
		}

		public FreeCarService()
		{
			_db = new EntityContext();
		}

		public List<Car> GetActiveCars()
		{
			//return _db.Histories.Where(h => h.IsReady).Select(h => h.Car).ToList();
			var cars = _db.Cars.ToList();
			return cars;
		}
	}
}
