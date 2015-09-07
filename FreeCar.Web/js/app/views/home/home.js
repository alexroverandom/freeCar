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
		this.cars.show(new App.Views.ActionChangeStatus({
			model: this.model
		}));
	}
});