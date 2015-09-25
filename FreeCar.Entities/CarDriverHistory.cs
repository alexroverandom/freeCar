using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
	public class CarDriverHistory : IEntity
	{
		public int Id { get; set; }

		public int CarId { get; set; }
		[JsonIgnore]
		public Car Car { get; set; }

		public string DriverId { get; set; }
		[JsonIgnore]
		public Driver Driver { get; set; }
		[JsonIgnore]
		public bool IsActive { get { return DateStop == null; } }

		public bool IsMain { get; set; }

		public DateTime DateStart { get; set; }

		public DateTime? DateStop { get; set; }

		public bool IsReady { get; set; }

		public bool OnLine { get; set; }
	}
}
