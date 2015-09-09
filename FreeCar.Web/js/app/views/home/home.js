App.Views.Home.HomeLayout = Marionette.LayoutView.extend({
	template: ".jHomeLayoutTmpl",
	regions: {
		cars: ".jActiveCars"
	},
	ui: {
		refresh: ".jRefreshCars"
	},
	modelEvents: {
		"change": "render"
	},
	events: {
		"click @ui.refresh": "showTinymceToShort"
	},
	onRender: function () {
		var view = new App.Views.Home.Cars({
			collection: App.Collections.cars
		});
		//App.Controllers.Cars.activeForHome(this.cars);
		this.cars.show(view);
	}
});