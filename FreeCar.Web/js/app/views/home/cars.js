App.Views.Home.CarsListItem = Marionette.ItemView.extend({
	template: ".jHomeCarsListItemTmpl"
});

App.Views.Home.Cars = Marionette.CompositeView.extend({
	template: ".jHomeCarsLayoutTmpl",
	childView: App.Views.Home.CarsListItem,
	childViewContainer: ".jContent"
});