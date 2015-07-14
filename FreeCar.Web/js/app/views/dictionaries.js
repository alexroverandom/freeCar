App.Views.DictionaryHeaderView = Marionette.ItemView.extend({
	template: ".jDictionaryHeaderTmpl",
	ui: {
		"save": ".jSave"
	},
	events: {
		"click @ui.save": "save"
	},
	save: function () {
		if (this.options.dictView) {

			var view = this.options.dictView;

			//var that = this;

			var fields = view.$el.find("[name]");

			var res = {};
			fields.each(function (i, item) {
				var propName = item.attributes.name.value;
				if (item.value) {
					if (propName === "text") {
						if (!res[propName]) {
							res[propName] = [];
						}
						res[propName].push({ culture: item.attributes['data-culture'].value, text: item.value });
					} else {
						res[propName] = item.value;
					}

				} else {
					alert("Значение полей не должно быть пустым");
					return;
				}

			});
			res.id = view.model.id;			

			$.post("/api/dictionaries/updateDictionary/", res).done(function (data) {
				//var record = App.Collections.DictionaryRecords.get(data.id);

				view.model.set(data);

				view.render();
				alert("Сохранено!");
			});
		}
	}
});

App.Views.DictionaryView = Marionette.ItemView.extend({
	template: ".jDictionaryTmpl",
	onRender: function (){
		//dictView
		App.pageHeaderRegion.show(new App.Views.DictionaryHeaderView({
			model: this.model,
			dictView: this
		}));
	}

});

App.Views.DictionariesCreationPanel = Marionette.ItemView.extend({
	template: ".jDictionariesCreationTmpl",
	ui: {
		createDictBtn: ".jCreateDictBtn",
		createBlock: ".jControls",
		closePanelBtn: ".jClosePanelBtn",
		input: "[name=code]"
	},
	events: {
		"click @ui.createDictBtn": "createDict",
		"click @ui.closePanelBtn": "closePanel",
		"keypress @ui.input": function (e) {
			if (("0123456789").indexOf(String.fromCharCode(e.keyCode)) === -1) {
				e.preventDefault();
				return false;
			}
			return true;
		},
	},
	createDict: function () {
		$.get("/api/dictionaries/createDictionary/?code=" + this.ui.input.val()).done(function (id) {
			//App.Collections.Dictionaries.add(data);
			//that.model.records = App.Collections.DictionaryRecords.withDictionaryId(that.model.id);
			//that.render();

			Backbone.history.navigate("/dictionaries/" + id + "/", {
				trigger: true
			});

		});
	},
	onRender: function () {
	},
	closePanel: function () {
		this.destroy();
	}
});

App.Views.DictionariesCreationHeader = Marionette.ItemView.extend({
	template: ".jDictionariesHeaderTmpl",
	ui: {
		showCreatePanelBtn: ".jShowDictPanel"
	},
	events: {
		"click @ui.showCreatePanelBtn": "showPanel"
	},
	showPanel: function () {
		var view = new App.Views.DictionariesCreationPanel();
		App.modalRegion.show(view);

		$(document).on("click", function (e) {

			var right = $(".jRightPanel");
			if (right.length > 0) {

				var child = (!$(e.target).hasClass("jRightPanel") && (right.find(e.target).length !== 0 && !$(e.target).hasClass("jCreateDictBtn"))) ||
					$(e.target).hasClass("jRightPanel");

				if (!$(e.target).hasClass("jShowDictPanel") && !child) {
					$(".jRightPanel").addClass("hide");
					//App.vent.trigger("panel:closing", view, "entity-create");
					view.destroy();
					$(document).off(e);
				}
			}
		});

	}
});

App.Views.DictionariesView = Marionette.ItemView.extend({
	template: ".jDictionariesTmpl",
	onRender: function () {
		App.pageHeaderRegion.show(new App.Views.DictionariesCreationHeader({
			model: this.model
		}));
	}
});

App.Views.DictionaryRecordCreationPanel = Marionette.ItemView.extend({
	template: ".jDictionaryRecordCreationTmpl",
	ui: {
		createRecordBtn: ".jCreateRecord",
		createBlock: ".jControls",
		closePanelBtn: ".jClosePanelBtn",
		input: "[name=code]"
	},
	events: {
		"click @ui.createRecordBtn": "createRecord",
		"click @ui.closePanelBtn": "closePanel",
		"keypress @ui.input": function (e) {
			if (("0123456789").indexOf(String.fromCharCode(e.keyCode)) === -1) {
				e.preventDefault();
				return false;
			}
			return true;
		},
	},
	createRecord: function () {
		var that = this;
		var fields = this.ui.createBlock.find("[name]");
		var res = {};
		fields.each(function (i, item) {
			var propName = item.attributes.name.value;
			if (item.value) {
				res[propName] = item.value;
			} else {
				alert("Значение полей не должно быть пустым");
				return;
			}

		});
		res.dictionaryId = this.model.id;

		$.post("/api/dictionaries/createDictionaryRecord/", res).done(function (data) {
			App.Collections.DictionaryRecords.add(data);
			that.model.records = App.Collections.DictionaryRecords.withDictionaryId(that.model.id);
			//that.render();

			Backbone.history.navigate("/dictionaries/records/" + data.id + "/", {
				trigger: true
			});

		});
	},
	onRender: function () {
	},
	closePanel: function () {
		this.destroy();
	}
});

App.Views.DictionaryRecordCreationHeader = Marionette.ItemView.extend({
	template: ".jDictionaryRecordsHeaderTmpl",
	ui: {
		showCreatePanelBtn: ".jShowDictPanel"
	},
	events: {
		"click @ui.showCreatePanelBtn": "showPanel"
	},
	showPanel: function () {
		var view = new App.Views.DictionaryRecordCreationPanel({
			model: this.model
		});
		App.modalRegion.show(view);

		$(document).on("click", function (e) {

			var right = $(".jRightPanel");
			if (right.length > 0) {

				var child = (!$(e.target).hasClass("jRightPanel") && (right.find(e.target).length !== 0 && !$(e.target).hasClass("jCreateRecord"))) ||
					$(e.target).hasClass("jRightPanel");

				if (!$(e.target).hasClass("jShowDictPanel") && !child) {
					$(".jRightPanel").addClass("hide");
					//App.vent.trigger("panel:closing", view, "entity-create");
					view.destroy();
					$(document).off(e);
				}
			}
		});
	}
});

App.Views.DictionaryRecordsView = Marionette.ItemView.extend({
	template: ".jDictionaryRecordsTmpl",
	ui: {
		list: ".jSortable",
	},
	events: {
		"sortupdate @ui.list": "sort"
	},
	sort: function (event, ui) {
		//var i = ui.item.index();
		var data = [];

		var els = this.ui.list.find("[data-id]");

		$.each(els, function (i, el) {
			data.push(el.attributes["data-id"].value);
		});

		$.post("/api/dictionaries/sort", { "ids": data }).done(function () {
			//TODO: добавить реакцию на сохранение
		});

	},
	onRender: function () {

		this.ui.list.sortable({
			handle: ".jSortableHandle"
		});

		App.pageHeaderRegion.show(new App.Views.DictionaryRecordCreationHeader({
			model: this.model
		}));


	}
});


App.Views.DictionaryRecordHeader = Marionette.ItemView.extend({
	template: ".jDictionaryRecordHeaderTmpl",
	ui: {
		"save": ".jSave"
	},
	events: {
		"click @ui.save": "save"
	},
	save: function () {
		if (this.options.recordView) {

			var view = this.options.recordView;

			//var that = this;

			var fields = view.$el.find("[name]");

			var res = {};
			fields.each(function (i, item) {
				var propName = item.attributes.name.value;
				if (item.value) {
					if (propName === "text") {
						if (!res[propName]) {
							res[propName] = [];
						}
						res[propName].push({ culture: item.attributes['data-culture'].value, text: item.value });
					} else {
						res[propName] = item.value;
					}

				} else {
					alert("Значение полей не должно быть пустым");
					return;
				}

			});
			res.id = view.model.id;
			res.dictionaryId = view.model.customDictionaryId;

			$.post("/api/dictionaries/updateDictionaryRecord/", res).done(function (data) {
				var record = App.Collections.DictionaryRecords.get(data.id);

				record.set(data);

				view.render();
				alert("Сохранено!");
			});
		}
	}
});

App.Views.DictionaryRecordView = Marionette.ItemView.extend({
	template: ".jDictionaryRecordTmpl",
	onRender: function () {
		App.pageHeaderRegion.show(new App.Views.DictionaryRecordHeader({
			model: this.model,
			recordView: this
		}));
	}
});