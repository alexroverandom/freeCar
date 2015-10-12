using FreeCar.Services;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.ServiceModel;
using System.ServiceModel.Description;
using System.Text;
using System.Threading.Tasks;

namespace FreeCar.TestServer
{
	class Program
	{
		static void Main(string[] args)
		{
			var uri_tcp = new Uri(ConfigurationManager.AppSettings["tcp_addr"]);
			var uri_http = new Uri(ConfigurationManager.AppSettings["http_addr"]);
			var host = new ServiceHost(typeof(FreeCarService));
			host.Open();
			Console.WriteLine("Chat service listen on endpoint \n{0} \nand \n{1}", uri_tcp, uri_http);
			Console.WriteLine("Press ENTER to stop chat service...");
			Console.ReadLine();
			host.Abort();
			host.Close();

		}
	}
}
