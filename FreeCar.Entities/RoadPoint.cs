using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class RoadPoint : IEntity
    {
        public int Id { get; set; }

		public int MapPointId { get; set; }
		[JsonIgnore]
        public MapPoint Point { get; set; }

		[JsonIgnore]
		public virtual ICollection<Road> Roads { get; set; }

        public RoadPoint()
        {
            //Roads = new List<Road>();
        }
    }
}
