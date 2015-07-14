
(function () {
	var tmplContext = ".jBreadcrumbsAppTmpls";

	App.Views.Entity.Breadcrumb = Marionette.LayoutView.extend({
		template: tmplContext + " .jBreadcrumbsTmpl",
		initialize: function (entity) {
			if (entity) {
				this.createCrumbs(entity.currentEntity);
			}
		},
		ui: {
			fixed: ".jFixed"
		},

		onShow: function () {

		},
		rebuild: function (entity) {
			this.createCrumbs(entity);
			this.render();
		},
		createCrumbs: function (currEntity) {
			//console.log("BreadCrumbEntity....");
			//console.log(currEntity);

			var crumbsColl = new Backbone.Collection();

			if (currEntity) {

				var currChildren = _.find(currEntity.children.$values, function (item) {
					return item.fieldName === currEntity.currentChildren;
				});
				var entityId;
				//if (currEntity.originalInfo) {
				//	entityId = currEntity.originalInfo.id;
				//}
				if (currEntity.hasDraft) {
					entityId = currEntity.draftId;
				}
				else {
					entityId = currEntity.originalInfo.id;
				}

				var crumb = {
					childrens: currEntity.children.$values,
					title: currEntity.title,
					id: entityId,
					originalId: currEntity.originalInfo.id,
					childrenType: currEntity.currentChildren,
					childrenName: currChildren ? currChildren.name : ""
				};

				crumbsColl.add(crumb);

				if (currEntity.parent) {
					this.createParentsCrumbs(currEntity.parent, crumbsColl);
				}
			}
			crumbsColl.add({ title: "Разделы" });

			this.collection = crumbsColl;
		},
		createParentsCrumbs: function (parent, collection) {

			var parentObj = App.Collections.entities.get(parent.id);

			if (parentObj) {

				var currChildren = _.find(parentObj.children.$values, function (item) {
					return item.fieldName === parentObj.currentChildrenName;
				});

				var parentObjId;
				if (parent.hasDraft) {
					parentObjId = parent.draftId;
				} else {
					parentObjId = parent.id;
				}

				var crumb = {
					childrens: parentObj.children.$values,
					title: parentObj.title,
					id: parentObjId,
					originalId: parentObj.id,
					childrenType: parentObj.currentChildrenName,
					childrenName: currChildren ? currChildren.name : ""
				}
				collection.add(crumb);
				if (parentObj.parent) {
					this.createParentsCrumbs(parentObj.parent, collection);
				}
			}
		}
	});
})();

