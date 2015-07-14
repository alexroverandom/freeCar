(function () {
	var tmplContext = ".jEntitiesAppTmpls";

	//правая панель
	var creation = Marionette.LayoutView.extend({
		template: tmplContext + " .jCreationTmpl",
		regions: {
			controls: ".jControls"
		},
		ui: {
			create: ".jCreateEntityBtn",
			closePanelBtn: ".jClosePanelBtn",
			type: "#type"
		},
		events: {
			"click @ui.create": "create",
			"click @ui.closePanelBtn": "closePanel",
			"change @ui.type": "change"
		},
		onBeforeRender: function () {
		},
		onRender: function () {

			var currentObj = _.find(this.model.children.$values, { fieldName: this.model.currentChildren });

			if (currentObj) {
				this.ui.type.text(currentObj.name);
				this.renderFields(currentObj);
			}

			var that = this;
			this.on("panel:closed", function() {
				that._confirmClosePanel();
			});
		},
		change: function () { },
		create: function () {
			App.needConfirmToLeave = false;
			var fields = {};
			var ref = this.controls.currentView.children.toArray();
			for (var i = 0; i < ref.length; i++) {
				var view = ref[i];
				fields[view.model.field] = view.getData();
				if (fields[view.model.field] === "") {
					alert("Поля не должны быть пустыми! Введите данные и повторите попытку!");
					return;
				}
			}
			var currChildren = this.model.currentChildren;
			var children = _.find(this.model.children.$values, {
				fieldName: currChildren
			});
			var obj = {
				id: this.model.id,
				field: currChildren,
				type: children.type,
				fields: fields
			};
			//return
			var that = this;
			$.postJson("/api/entities/create/", obj).done(function (id) {
				//return
				that.destroy();
				Backbone.history.navigate("/entities/" + id + "/", {
					trigger: true
				});
			});
		},
		renderFields: function (child) {
			var fields = new Backbone.Collection();
			var ref = child.requiredFields;
			for (var field in ref) {
				if (field === "$type") {
					continue;
				}

				var mdata = ref[field];

				var model = {
					name: child.name,
					field: field,
					//control: mdata.attrs.control.type,
					metadata: mdata,
					data: this.model.data[field]
				};

				if (model.field === "urlSegment") {
					model.data = "";
					model.control = "Textbox";
					model.metadata.attrs = {
						control: {
							type: "Textbox",
							title: "Урл сегмент"
						}
					};
				} else {
					model.control = mdata.attrs.control.type;
				}

				fields.add(new Backbone.ExtModel(model));
			}
			this.controls.show(new App.Views.ControlsList({
				collection: fields
			}));
		},
		closePanel: function () {
			//this.destroy();
			//this.triggerMethod("panel:closed");
			App.vent.trigger("panel:closing", this);
		},
		_confirmClosePanel: function() {
		}
	});

	//heder
	var entitiesManageView = Marionette.ItemView.extend({
		template: ".jEntitiesManagLayoutTmpl",
		templateHelpers: function () {
			var that = this;
			return {
				getTitle: (function () {
					var name;
					if (that.model) {


						var child = _.find(that.model.children.$values, function(obj) {
							return obj.fieldName === that.model.currentChildren;
						});
						name = child.name;
					} else {
						name = "Рaзделы";
					}

					return name;
				})
			};
		},
		ui: {
			entityCreateBtn: ".jEntityCreateBtn"
		},
		events: {
			"click @ui.entityCreateBtn": function () {


				var view = new creation({
					model: this.model
				});

				App.modalRegion.show(view);

				$(document).on("click.entity-create", function (e) {

					var right = $(".jRightPanel");
					if (right.length > 0) {
						var child = (!$(e.target).hasClass("jRightPanel") && (right.find(e.target).length !== 0 && !$(e.target).hasClass("jCreateEntityBtn"))) ||
							$(e.target).hasClass("jRightPanel");
						if (!$(e.target).hasClass("jShowDictPanel") && !$(e.target).hasClass("jEntityCreateBtn") && (!child)) {
							//$(".jRightPanel").addClass("hide");
							App.vent.trigger("panel:closing", view, "entity-create");
							
						}
					}
				});


			}
		},
		onRender: function () {
			//console.log(this.model);
		}
	});

	App.Views.Entities.Layout = Marionette.LayoutView.extend({
		template: tmplContext + " .jLayoutTmpl",
		regions: {
			//creation: ".jCreation"
		},
		ui: {
			type: "#type",
			list: ".jSortable"
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

			$.post("/api/entities/sort", { "ids": data }).done(function () {
				//TODO: добавить реакцию на сохранение
			});

		},
		onRender: function () {
			var pageHeaderModelDto = {
				data: {
					info: {
						title: "Разделы"
					}
				}
			};

			if (this.model.entity) {

				this.ui.list.sortable({
					handle: ".jSortableHandle"
				});
				//this.ui.list.on("sortupdate", function(event, ui) {
				//	var x = 1;
				//});

				this.model.entity.currentChildren = this.model.currentChildren;

				var currentObj = _.find(this.model.entity.children.$values, { fieldName: this.model.entity.currentChildren });
				if (currentObj) {
					pageHeaderModelDto.data.info.title = currentObj.name;
				}

				//this.creation.show(new Creation({
				//	model: this.model.entity
				//}));

			}

			App.pageHeaderRegion.show(new entitiesManageView({
				model: this.model.entity
			}));

			//App.pageHeaderRegion.show(new App.Views.PageHeader({ model: new Backbone.Model(pageHeaderModelDto) }));
		}
	});
})();


