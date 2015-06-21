using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FreeCar.Web.Startup))]
namespace FreeCar.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
