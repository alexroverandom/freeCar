
App.Views.Controls.Textbox = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	ui: {
		input: "input"
	},
	events: {
		"blur @ui.input": "onOut"
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
		return this.ui.input.val();
	},
	onOut: function () {
		var changed = false;
		if (this.ui.input.val() === "" && (this.model.data) && (this.model.data !== this.ui.input.val())) {
			changed = true;
		}

		if (this.ui.input.val() !== "" && !(this.model.data)) {
			changed = true;
		}
		if (this.ui.input.val() !== "" && (this.model.data) && (this.model.data !== this.ui.input.val())) {
			changed = true;
		}

		if (changed) {
			App.needConfirmToLeave = true;
		}
		//return;
	}
});

