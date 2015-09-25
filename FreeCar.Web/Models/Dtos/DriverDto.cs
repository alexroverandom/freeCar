using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FreeCar.Web.Models.Dtos
{
	public class DriverDto
	{
		public string Id { get; set; }
		public string Name { get; set; }
		public int ActiveCarId { get; set; }
		public float Latitude { get; set; }
		public float longitude { get; set; }
	}
}