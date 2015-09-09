App.Controllers.Home = {
	show: function () {
		var view = new App.Views.Home.HomeLayout();
		App.mainRegion.show(view);
	}
};