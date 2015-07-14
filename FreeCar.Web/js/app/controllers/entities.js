

App.Controllers.Entities = _.extend({}, App.Controllers.Base, {
	showPreloader: function () {
		var preloader = new App.Views.Components.PagePreloader();
		preloader.render();
		preloader.$el.css({
			height: App.mainRegion.$el.height()
		});
		App.mainRegion.$el.append(preloader.$el);
	},
	attachToMain: function (view) {
		view.el = App.mainRegion.$el.find(">:first-child");
		App.mainRegion.attachView(view);
	},
	showOnMain: function (view) {
		App.mainRegion.show(view);
	},
	showOnHeader: function (view) {
		App.headerRegion.currentView.content.show(view);
	},
	show: function (id) {
		var entity = new App.Models.Entity({
			id: id
		});

		entity.fetch()
			.done(function (ent) {

				App.Collections.entities.add(ent.$values, {
					merge: true
				});

				var currObj = App.Collections.entities.get(id);

				//иначе при переходе на сущность будет дорисовывать крамбсину на этот чилдрен
				if (currObj.currentChildren) {
					currObj.currentChildren = null;
				}
				//console.log(currObj);


				App.mainRegion.show(new App.Views.Entity.Layout({
					model: currObj
				}));

				App.breadCrumbsRegion.show(new App.Views.Entity.Breadcrumb({
					currentEntity: currObj
				}));

			})
		.fail(function (err) {
			if (err.status === 404) {
				App.mainRegion.show(new App.Views.Err404());
			}
		});
	},
	list: function (id, field) {

		App.Collections.entities.children(id, field).done(function (entities) {

			var ref = App.Collections.entities.get(id);

			var entity = ref != null ? ref : new App.Models.Entity({
				id: id
			});

			entity.fetch().done(function (data) {

				App.Collections.entities.add(data.$values, {
					merge: true

				});
				var currObj = App.Collections.entities.get(id);

				var model = new Backbone.ExtModel({
					children: new Backbone.Collection(entities),
					entity: currObj,
					currentChildren: field
				});

				App.mainRegion.show(new App.Views.Entities.Layout({
					model: model
				}));

				App.breadCrumbsRegion.show(new App.Views.Entity.Breadcrumb({
					currentEntity: currObj
				}));

			});
		});
	},
	root: function () {
		var model = new Backbone.ExtModel({
			children: new Backbone.Collection(App.Collections.entities.root()).toArray()
		});
		App.mainRegion.show(new App.Views.Entities.Layout({
			model: model.children[0]
		}));
		App.breadCrumbsRegion.show(new App.Views.Entity.Breadcrumb({}));
	},
	getDraftId: function (id) {
		return $.post("/api/entities/loaddraft/?id=" + id);
	}
});

