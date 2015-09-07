using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class Car : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Number { get; set; }

		public int CarModelId { get; set; }
		[JsonIgnore]
        public CarModel Model { get; set; }

		//public int CarTypeId { get; set; }
		//[JsonIgnore]
		//public CarType Type { get; set; }

        public int? TechDataId { get; set; }
		[JsonIgnore]
		public TechData TechData { get; set; }

		//[JsonIgnore]
		//public ICollection<Driver> ActiveDrivers 
		//{
		//	get 
		//	{ 
		//		return DriversHistory
		//				.Where(dh => dh.CarId == Id && dh.IsActive)
		//				.Select(dh => dh.Driver)
		//				.ToList(); 
		//	}
		//}

		//[JsonIgnore]
		//public Driver ActiveDriver
		//{
		//	get
		//	{
		//		return DriversHistory.FirstOrDefault(dh => dh.CarId == Id && dh.IsActive && dh.IsMain) != null
		//			? DriversHistory.FirstOrDefault(dh => dh.CarId == Id && dh.IsActive && dh.IsMain).Driver
		//			: null;
		//	}
		//}

		[JsonIgnore]
		public ICollection<CarDriverHistory> DriversHistory { get; set; }

		//[JsonIgnore]
		//public ICollection<Driver> Drivers 
		//{
		//	get { return DriversHistory.Select(dh => dh.Driver).ToList(); }
		//}

		public CarColor Color { get; set; }
    }

	public enum CarColor 
	{
		Black,
		White,
		Green,
		Red,
		Blue,
		Gray,
		Metallic,
		Yellow,
		Pink,
		Orange
	}
}
