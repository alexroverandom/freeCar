using FreeCar.DataAccess;
using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FreeCar.Web.Models.ViewModels
{
	public class LayoutViewModel
	{
		public LayoutViewModel(EntityContext db) 
		{
			Cars = db.Cars.ToList();//.Where(c => c.DriversHistory.Any(dh => dh.IsActive)).ToList();
			CarModels = db.CarModels.ToList();
			CarBrands = db.CarBrands.ToList();
		}

		public IEnumerable<Car> Cars { get; set; }
		public IEnumerable<CarModel> CarModels { get; set; }
		public IEnumerable<CarBrand> CarBrands { get; set; }
	}
}