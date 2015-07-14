(function () {

	var Child = Marionette.LayoutView.extend({
		getTemplate: function () {
			return MenuControlGetTemplate(this, true, "EditableChildrenItem");
		},
		regions: {
			controls: ".jControls"
		},
		ui: {
			remove: "[name=remove]"
		},
		events: {
			"click @ui.remove": function () {
				//return
				this.model.isRemoved = true;
				this.render();

				this.triggerMethod("child:remove");
				App.needConfirmToLeave = true;
			}
		},
		modelEvents: {
			"change": "render"
		},
		serializeData: function () {
			var ref = this.model.data;
			return _.extend({}, this.model.metadata.attrs, {
				isRemoved: this.model.isRemoved,
				num: ref != null ? ref.num : void 0,
				cid: this.model.cid,
				structureId: this.model.structureId,
				isDisabled: this.model.isDisabled
			});
		},
		onRender: function () {

			//var field, fields, mdata, _ref, _ref1;
			

			var fields = new Backbone.Collection();
			var ref = this.model.metadata.props;
			var ref1 = this.model.data;
			for (field in ref) {
				if (field === "$type") {
					continue;
				}
				var mdata = ref[field];
				fields.add(new Backbone.ExtModel({
					field: field,
					control: mdata.attrs.control.type,
					metadata: mdata,
					data: ref1 != null ? ref1[field] : void 0,
					rootUrl: this.model.rootUrl,
					structureId: this.model.structureId + field,
					isDisabled: this.model.isDisabled
				}));
			}

			var object = {
				collection: fields,
				isMenu: this.options.isMenu
			};
			if (this.options.isMenu) {
				object.tagName = "ul";
				object.className = "editableChildrenControls";
			}

			this.controls.show(new App.Views.ControlsList(object));

		},
		getData: function () {
			//var data, view, _i, _len, _ref;
			var data = this.model.data;
			var ref = this.controls.currentView.children.toArray();
			for (var i = 0; i < ref.length; i++) {
				var view = ref[i];
				data[view.model.field] = view.getData();
			}
			return data;
		},
		getFile: function () {
			return _.chain(this.controls.currentView.children.toArray()).map(function (c) {
				return typeof c.getFile === "function" ? c.getFile() : void 0;
			}).flatten().compact().value();
		}
	});
	var Children = Marionette.CollectionView.extend({
		childViewOptions: function () {
			return {
				isMenu: this.options.isMenu
			}
		},
		childView: Child,
		behaviors: {
			Sortable: {
				containment: 'parent',
				handle: ".jSort"
			}
		},
		childEvents: {
			"child:remove":function() {
				this.triggerMethod("child:remove");
			}
		}

	});

	App.Views.Controls.EditableChildren = Marionette.LayoutView.extend({
		getTemplate: function () {
			return MenuControlGetTemplate(this, true);
		},
		regions: {
			children: ".jChildren"
		},
		ui: {
			create: "[name=create]",
			types: "[name=types]"
		},
		events: {
			"click @ui.create": function (e) {
				App.needConfirmToLeave = true;
				e.stopPropagation();
				//var meta, model, name, nextNum;
				var name = this.ui.types.select2("data").id;
				var meta = _.find(this.model.metadata.types.$values, {
					name: name
				});
				var nextNum;
				if (this.children.currentView.collection.models[0]) {
					nextNum = this.children.currentView.collection.max(function (model) {
						return model.data.num;
					}).data.num + 1;
				} else {
					nextNum = 0;
				}
				var model = new Backbone.ExtModel({
					type: name,
					metadata: meta.metadata,
					data: {
						$type: name,
						num: nextNum
					}
				});
				//return
				this.children.currentView.collection.add(model);
			}
		},
		serializeData: function () {
			return _.extend({}, this.model.metadata.attrs, {
				cid: this.model.cid,
				structureId: this.model.structureId,
				isDisabled: this.model.isDisabled
			});
		},
		onRender: function () {
			//var children, childrenArray, first, obj, type, _i, _len, _ref;
			var first = this.model.metadata.types.$values[0];
			//console.log("***"+this.model.field);
			//console.log(this.model.data);
			this.ui.types.select2({
				width: "resolve",
				minimumResultsForSearch: -1,
				data: _.map(this.model.metadata.types.$values, function (v) {
					return {
						id: v.name,
						text: v.metadata.attrs.description.description
					};
				}),
				initSelection: function (el, cb) {
					return cb({
						id: first.name,
						text: first.metadata.attrs.description.description
					});
				}
			});
			var childrenArray = [];

			if (this.model.data) {

				var ref = this.model.data.$values || this.model.data;

				for (var i = 0; i < ref.length; i++) {
					var obj = ref[i];
					var type = obj.$type || this.model.data.$type.replace(/.*\[\[(.*)\]\].*/ig, "$1");
					childrenArray.push(new Backbone.ExtModel({
						type: type,
						metadata: _.find(this.model.metadata.types.$values, {
							name: type
						}).metadata,
						data: obj,
						isRemoved: false,
						rootUrl: this.model.rootUrl,
						structureId: this.model.structureId + i,
						isDisabled: this.model.isDisabled
					}));
				}
			}
			var children = new Backbone.Collection(_.sortBy(childrenArray, function (el) {
				return el.data.num;
			}));
			//return

			var object = {
				collection: children,
				isMenu: this.options.isMenu
			};
			if (this.options.isMenu) {
				object.tagName = "ul";
				//object.className = "nav";
			}

			this.children.show(new Children(object));

		
		},
		getData: function () {
			//var data, view, x, _i, _len, _ref;
			var data = [];
			var ref = this.children.currentView.children.toArray();
			for (var i = 0; i < ref.length; i++) {
				var view = ref[i];
				if (!view.model.isRemoved) {
					data.push(view.getData());
				}
			}
			//x = 1;
			return data;
		},
		getFile: function () {
			return _.chain(this.children.currentView.children.toArray())
                .map(function (c) {
                	return typeof c.getFile === "function" ? c.getFile() : void 0;
                })
                .flatten()
                .compact()
                .value();
		}
	});

})();

