using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class CarType : IEntity
    {
        public int Id { get; set; }

        [JsonIgnore]
        public ICollection<Car> Cars { get; set; }
    }
}
