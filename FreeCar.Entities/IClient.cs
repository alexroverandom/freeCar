using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace FreeCar.Entities
{
    public interface IClient
    {
        ICollection<Order> Orders { get; set; }
    }
}
