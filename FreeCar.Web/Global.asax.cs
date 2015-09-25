using FreeCar.Web.App_Start;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace FreeCar.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
			JsonConvert.DefaultSettings = () =>
			{
				var settings = new JsonSerializerSettings
				{
					ContractResolver = new CamelCasePropertyNamesContractResolver(),
					PreserveReferencesHandling = PreserveReferencesHandling.None,
					Formatting = Formatting.None,
					DateTimeZoneHandling = DateTimeZoneHandling.Local
				};

#if DEBUG
				settings.Formatting = Formatting.Indented;
#endif

				settings.Converters.Add(new StringEnumConverter());

				return settings;
			};
            AreaRegistration.RegisterAllAreas();
			GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }
    }
}
