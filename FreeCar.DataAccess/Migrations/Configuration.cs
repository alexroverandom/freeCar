namespace FreeCar.DataAccess.Migrations
{
	using FreeCar.Entities;
	using System;
	using System.Collections.Generic;
	using System.Data.Entity;
	using System.Data.Entity.Migrations;
	using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<FreeCar.DataAccess.EntityContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(FreeCar.DataAccess.EntityContext context)
        {
			var brands = new List<CarBrand>
			{
				new CarBrand { Name = "Toyota"},
				new CarBrand { Name = "Fiat"},
				new CarBrand { Name = "Ford"},
				new CarBrand { Name = "Opel"},
				new CarBrand { Name = "Mersedes"}
			};
			context.CarBrands.AddRange(brands);
			context.SaveChanges();
        }
    }
}
