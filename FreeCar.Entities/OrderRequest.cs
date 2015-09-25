using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
	public class OrderRequest
	{
		public WaitingPeriod Period { get; set; }
		public ServiceClass Class { get; set; }

		public MapPoint StartPoint { get; set; }
		public MapPoint EndPoint { get; set; }
		public List<MapPoint> RoutePoints { get; set; }
	}

	public enum WaitingPeriod 
	{
		About_15,
		About_30,
		About_60,
		Custom
	}

	public enum ServiceClass 
	{
		Econom,
		Business,
		All
	}
}
