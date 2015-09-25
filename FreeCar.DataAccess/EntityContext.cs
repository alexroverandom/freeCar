using FreeCar.Entities;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.DataAccess
{
	public class EntityContext : IdentityDbContext<WebUser>
	{
		public DbSet<Car> Cars { get; set; }
		public DbSet<CarType> CarTypes { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<OrderedCar> OrderedCars { get; set; }
		public DbSet<TechData> TechDaataSet { get; set; }

		public DbSet<Route> Routes { get; set; }
		public DbSet<Road> Roads { get; set; }
		public DbSet<RoadPoint> RoadPoints { get; set; }
		public DbSet<MapPoint> MapPoints { get; set; }
		public DbSet<City> Cities { get; set; }

		public DbSet<CarBrand> CarBrands { get; set; }
		public DbSet<CarModel> CarModels { get; set; }
		public DbSet<Country> Countries { get; set; }

		public DbSet<Driver> Drivers { get; set; }
		public DbSet<Manager> Managers { get; set; }
		public DbSet<WebClient> Clients { get; set; }
		public DbSet<OrderRequest> Requests { get; set; }
		public DbSet<CarDriverHistory> Histories { get; set; }



		public EntityContext()
			: base("default")
		{
		}

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			//modelBuilder.HasDefaultSchema("FreeCar");
			modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
			base.OnModelCreating(modelBuilder);
		}

		public static EntityContext Create()
		{
			return new EntityContext();
		}
	}
}
