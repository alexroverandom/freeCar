using System.Web;
using System.Web.Optimization;

namespace FreeCar.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
			bundles.Add(new ScriptBundle("~/bundles/libs")
				.IncludeDirectory("~/js/libs", "*.js", true)
				.IncludeDirectory("~/js/practices", "*.js", true));
			bundles.Add(new ScriptBundle("~/bundles/app")
				.IncludeDirectory("~/js/app", "*.js", true));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
				.IncludeDirectory("~/js/bootstrap", "*.js", true));

            bundles.Add(new StyleBundle("~/css").Include(
                      "~/css/bootstrap.css",
                      "~/css/layout.css"
					  ));
        }
    }
}
