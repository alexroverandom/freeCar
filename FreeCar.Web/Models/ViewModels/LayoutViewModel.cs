using FreeCar.DataAccess;
using FreeCar.Entities;
using FreeCar.Web.FreeCarService;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FreeCar.Web.Models.ViewModels
{
	public class LayoutViewModel
	{
		public LayoutViewModel() 
		{
		}

		public IEnumerable<FreeCar.Web.FreeCarService.Car> Cars { get; set; }
		public IEnumerable<FreeCar.Web.FreeCarService.CarModel> CarModels { get; set; }
		public IEnumerable<FreeCar.Web.FreeCarService.CarBrand> CarBrands { get; set; }
	}
}