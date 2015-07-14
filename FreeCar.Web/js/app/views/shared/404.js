App.Views.Err404 = Marionette.ItemView.extend({
	template: ".jErr404Layout",
	onRender: function() {
		App.pageHeaderRegion.show(new App.Views.CustomHeader({
			model: new Backbone.ExtModel({ title: "404" })
		}));
	}
});