
App.Views.Controls.Checkbox = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	ui: {
		input: "input"
	},
	events: {
		"change @ui.input": function () {

			var changed = false;
			if (this.ui.input.prop("checked") === "" && (this.model.data) && (this.model.data !== this.ui.input.prop("checked"))) {
				changed = true;
			}

			if (this.ui.input.prop("checked") !== "" && !(this.model.data)) {
				changed = true;
			}
			if (this.ui.input.prop("checked") !== "" && (this.model.data) && (this.model.data !== this.ui.input.prop("checked"))) {
				changed = true;
			}

			if (changed) {
				App.needConfirmToLeave = true;
			}
		}
	},
	serializeData: function () {
		return _.extend({}, this.model.metadata.attrs, {
			val: this.model.data,
			cid: this.model.cid,
			structureId: this.model.structureId,
			isDisabled: this.model.isDisabled
		});
	},
	getData: function () {
		return this.ui.input.prop("checked");
	}
});

