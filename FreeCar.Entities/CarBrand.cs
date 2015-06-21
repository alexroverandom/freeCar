using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class CarBrand : IEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public List<Country> Countries { get; set; } 
    }
}
