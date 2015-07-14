
App.Views.Controls.Group = Marionette.LayoutView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	regions: {
		controls: ".jControls"
	},
	serializeData: function () {
		return _.extend({}, this.model.metadata.attrs, {
			cid: this.model.cid,
			structureId: this.model.structureId,
		});
	},
	onRender: function () {
		//var field, fields, mdata, _ref, _ref1;
		var fields = new Backbone.Collection();
		var ref = this.model.metadata.props;
		var ref1 = this.model.data;
		for (var field in ref) {
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
			//object.className = "nav";
		}

		this.controls.show(new App.Views.ControlsList(object));
	},
	getData: function () {
		//var data, view, x, _i, _len, _ref;
		var data = {};
		var ref = this.controls.currentView.children.toArray();
		for (var i = 0; i < ref.length; i++) {
			var view = ref[i];
			data[view.model.field] = view.getData();
		}
		//x = 1;
		return data;
	},
	getFile: function () {
		return _.chain(this.controls.currentView.children.toArray()).map(function (c) {
			return typeof c.getFile === "function" ? c.getFile() : void 0;
		}).flatten().compact().value();
	}
});
