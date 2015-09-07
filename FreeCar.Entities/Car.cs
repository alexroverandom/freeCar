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

        public string DriverId { get; set; }
        [JsonIgnore]
        public Driver ActiveDriver { get; set; }

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
