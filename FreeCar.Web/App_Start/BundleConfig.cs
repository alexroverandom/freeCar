using System.Web;
using System.Web.Optimization;

namespace FreeCar.Web
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
			bundles.Add(new ScriptBundle("~/bundles/libs").Include(
						"~/js/libraries/jquery-2.1.0.js",
						"~/js/libraries/jquery.cookie.js",
						"~/js/libraries/lodash.js",
						"~/js/libraries/backbone.marionette/backbone.js",
						"~/js/libraries/backbone.marionette/backbone.marionette.js",
						"~/js/libraries/backbone.marionette/backbone.routefilter.js",
						"~/js/libraries/jsrender.js",
						"~/js/libraries/ajaxSetup.js",
                        "~/js/libraries/angular.js",
						
						"~/js/libraries/spin.js",
						"~/js/libraries/modernizr-2.7.1.js",
						"~/js/libraries/select2/select2.js",
						"~/js/libraries/select2/select2_locale_ru.js",
						"~/js/libraries/bootstrap/button.js"));

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
