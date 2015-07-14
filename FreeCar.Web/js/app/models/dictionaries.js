App.Models.DictionaryRecord = Backbone.ExtModel.extend();

App.Models.Dictionary = Backbone.ExtModel.extend();

App.Models.DictionaryCollection = Backbone.Collection.extend({
	model: App.Models.Dictionary,
	url:"/api/dictionaries/getDictionaries"
});

App.Models.DictionaryRecordsCollection = Backbone.Collection.extend({
	model: App.Models.DictionaryRecord,
	url: "/api/dictionaries/getDictionaryRecords/",
	withDictionaryId: function (id) {
		var filtered = this.filter(function (item) {
			return item.dictionaryId == id;
		});
		//var filtered = _.filter(this.$values, function() {
		//	return item.customDictionaryId == id;
		//});
		return new Backbone.Collection(filtered);
	}
});