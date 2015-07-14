App.Views.Controls.PageInfo = Marionette.LayoutView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this, false, "Group");
	},
	regions: {
		controls: ".jControls"
	},
	serializeData: function () {
		return _.extend({}, this.model.metadata.attrs, {
			cid: this.model.cid,
			structureId: this.model.structureId,
			isDisabled: this.model.isDisabled
		});
	},
	onRender: function () {
		//var field, fields, mdata, _ref;
		var fields = new Backbone.Collection();
		var ref = this.model.metadata.props;
		for (var field in ref) {
			if (field === "$type") {
				continue;
			}
			var mdata = ref[field];
			fields.add(new Backbone.ExtModel({
				field: field,
				control: mdata.attrs.control.type,
				metadata: mdata,
				data: this.model.data[field],
				structureId: this.model.structureId + field
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
		var data = this.model.data;
		var ref = this.controls.currentView.children.toArray();
		for (var i = 0; i < ref.length; i++) {
			var view = ref[i];
			data[view.model.field] = view.getData();
		}
		//x = 1;
		return data;
	}
});
