
App.Views.Controls.File = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	ui: {
		file: "[type=file]",
		desc: "[name=desc]",
		id: ".jId",
		remove: "[name=remove]"
	},
	events: {
		"change @ui.file": function () {
			this.model.data.id = Utils.uuid4["new"]();

			App.needConfirmToLeave = true;
			return this.ui.id.text(this.model.data.id);
		},
		"click @ui.remove": function (e) {
			e.stopPropagation();
			this.model.data.id = Utils.uuid4.empty();
			this.model.data.name = "";
			this.model.data.description = "";
			this.ui.file.val("");

			App.needConfirmToLeave = true;
			this.render();
			//return this.ui.id.text(this.model.data.id);
		}
	},
	initialize: function () {
		var base = this.model;
		return base.data != null ? base.data : base.data = {};
	},
	getData: function () {
		return _.extend(this.model.data, {
			description: this.ui.desc.val()
		});
	},
	serializeData: function () {
		return _.extend({}, this.model.metadata.attrs, this.model.data, {
			cid: this.model.cid,
			structureId: this.model.structureId,
			isDisabled: this.model.isDisabled
		});
	},
	getFile: function (field) {
		//var files;
		var files = this.ui.file[0].files;
		if (files.length > 0) {
			return {
				id: this.model.data.id,
				file: files[0]
			};
		}
	}
});
