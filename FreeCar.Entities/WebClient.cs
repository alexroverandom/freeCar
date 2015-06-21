using Microsoft.AspNet.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.Entities
{
    public class WebClient : WebUser, IClient
    {
        [JsonIgnore]
        public ICollection<Order> Orders { get; set; }

		public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<WebClient> manager)
		{
			// Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
			var userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
			// Add custom user claims here
			return userIdentity;
		}
    }
}
