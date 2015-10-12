using FreeCar.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.ServiceModel.Activation;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace FreeCar.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

			routes.MapRoute("Home", "home/{*url}", new { controller = "Home", action = "Index" });

			routes.MapRoute("App", "app/{*url}", new { controller = "App", action = "Index" });

			routes.Add(new ServiceRoute("hello", new ServiceHostFactory(), typeof(IFreeCarService)));

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "App", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
