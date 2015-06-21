using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class Route: IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<Road> Roads { get; set; }

        public int StartRoadPointId { get; set; }
        [JsonIgnore]
        public RoadPoint StartPoint { get; set; }

        public int EndRoadPointId { get; set; }
        [JsonIgnore]
        public RoadPoint EndPoint { get; set; }
    }
}
