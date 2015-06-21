using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class Driver: WebUser
    {
        [JsonIgnore]
        public ICollection<Car> Cars { get; set; }

        public int ActiveCarId { get; set; }
        [JsonIgnore]
        public Car ActiveCar { get; set; }

		public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<Driver> manager)
		{
			// Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
			var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
			// Add custom user claims here
			return userIdentity;
		}
    }
}
