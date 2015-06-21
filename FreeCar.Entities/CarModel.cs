﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class CarModel: IEntity
    {
        public int Id { get; set; }

        public string ModelName { get; set; }
        [JsonIgnore]
        public CarBrand Brand { get; set; }
    }
}
