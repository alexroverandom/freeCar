using FreeCar.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FreeCar.Web.Models.Dtos
{
	public class RequestDto
	{
		public WaitingPeriod Period { get; set; }
		public ServiceClass Class { get; set; }

		public MapPoint StartPoint { get; set; }
		public MapPoint EndPoint { get; set; }
		public List<MapPoint> RoutePoints { get; set; }
	}
}