App.Controllers.Dictionaries = {
	list: function () {
		App.Collections.Dictionaries.fetch().done(function () {
			App.mainRegion.show(new App.Views.DictionariesView({
				collection: App.Collections.Dictionaries
			}));

		});

		//App.breadCrumbsRegion.reset();

		App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
			collection: new Backbone.Collection(this._createDictionariesBreadcrumbs())
		}));
	},
	show: function (id) {
		var that = this;
		$.get("/api/dictionaries/getDictionary/?id=" + id).done(function (obj) {
			App.mainRegion.show(new App.Views.DictionaryView({
				model: new Backbone.ExtModel(obj)
			}));

			App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
				collection: new Backbone.Collection(that._createDictionaryBreadcrumbs(obj.nameAdmin))
			}));

		});
	},
	_createDictionariesBreadcrumbs: function () {
		var arr = [];
		arr.push({
			title: "Словари"
		});
		return arr;
	},
	_createDictionaryBreadcrumbs: function(title) {
		var arr = [];
		arr.push({
			title: title
		});

		arr.push({
			parent: {
				title: "Словари",
				url: "dictionaries"
			}
		});
		return arr;
	}
};

App.Controllers.DictionaryRecords = {
	show: function (id) {

		var that = this;

		App.Collections.Dictionaries.fetch().done(function () {
			App.Collections.DictionaryRecords.fetch().done(function () {
				var dictionary = App.Collections.Dictionaries.get(id);

				if (dictionary) {
					dictionary.records = that._getRecords(id);
					App.mainRegion.show(new App.Views.DictionaryRecordsView({
						model: dictionary
					}));

					App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
						collection: new Backbone.Collection(that._createBreadcrumbs(dictionary))
					}));

				}
			});
		});


	},
	_getRecords: function (id) {
		var records = App.Collections.DictionaryRecords.withDictionaryId(id);
		return records;
	},
	_createBreadcrumbs: function (dictionary) {
		var arr = [];

		arr.push({
			title: dictionary.nameAdmin
		});

		arr.push({
			parent: {
				title: "Словари",
				url: "dictionaries"
			}
		});

		return arr;
	}
};

App.Controllers.DictionaryRecord = {
	show: function (id) {
		var that = this;
		App.Collections.DictionaryRecords.fetch().done(function () {
			var record = App.Collections.DictionaryRecords.get(id);

			App.mainRegion.show(new App.Views.DictionaryRecordView({ model: record }));

			App.Collections.Dictionaries.fetch().done(function () {
				App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
					collection: new Backbone.Collection(that._createBreadcrumbs(record))
				}));
			});

		});
	},
	_createBreadcrumbs: function (record) {
		var arr = [];
		//customDictionaryId
		//dicTextLocales[0]
		arr.push({
			title: record.title
		});

		var dict = App.Collections.Dictionaries.get(record.dictionaryId);

		arr.push({
			parent:
			{
				title: dict.nameAdmin,
				url: "dictionaries/" + record.dictionaryId + "/records"
			}
		});

		arr.push({
			parent: {
				title: "Словари",
				url: "dictionaries"
			}
		});


		return arr;
	}
};