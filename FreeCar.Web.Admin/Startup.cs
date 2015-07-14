using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FreeCar.Web.Admin.Startup))]
namespace FreeCar.Web.Admin
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
