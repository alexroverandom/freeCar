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
				.IncludeDirectory("~/js/libraries", "*.js", true);

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
						"~/js/bootstrap/modal.js",
						"~/js/bootstrap/alert.js",
						"~/js/bootstrap/dropdown.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/css/bootstrap.css",
                      "~/css/layout.css"
					  ));
        }
    }
}
