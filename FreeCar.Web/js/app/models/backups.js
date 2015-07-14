App.Models.Backups = Backbone.ExtModel.extend();

App.Models.BackupsCollection = Backbone.Collection.extend({
	model: App.Models.Backups,
	url: "/api/entities/getversions/",
	withData: function (id) {
		//var filtered = this.filter(function (item) {
		//	return item.customDictionaryId == id;
		//});
		//return new Backbone.Collection(filtered);
	}
});