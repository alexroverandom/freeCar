App.Controllers.Home = {
	show: function () {
		var view = new App.Views.Home.HomeLayout({ collection: App.Collections.cars });
		App.mainRegion.show(view);
	}
};