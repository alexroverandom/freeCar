using FreeCar.DataAccess;
using FreeCar.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace FreeCar.Client
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

		private async void Button_Click(object sender, RoutedEventArgs e)
		{
			var cars = await GetCars();
			Console.Write("Count = ", cars.Count());
		}

		private async Task<List<Car>> GetCars() 
		{
			var cars = new List<Car>();
			using (var client = new HttpClient()) 
			{
				var requestUri = new Uri("http://localhost:1659/api/car/getcars");
				var response = await client.GetAsync(requestUri);
				if (response.StatusCode == System.Net.HttpStatusCode.OK) 
				{
					var json = await response.Content.ReadAsStringAsync();
					var data = JsonConvert.DeserializeObject<CarsDto>(json);
					return data.Cars;
				}
			}
			return cars;
		}
    }

	public class CarsDto
	{
		public List<Car> Cars { get; set; }
	}
}
