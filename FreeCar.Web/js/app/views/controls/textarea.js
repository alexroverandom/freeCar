
App.Views.Controls.Textarea = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	ui: {
		textarea: "textarea"
	},
	events: {
		"blur @ui.textarea": "onOut"
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
		return this.ui.textarea.val();
	},
	onOut: function () {
		var changed = false;
		if (this.ui.textarea.val() === "" && (this.model.data) && (this.model.data !== this.ui.textarea.val())) {
			changed = true;
		}

		if (this.ui.textarea.val() !== "" && !(this.model.data)) {
			changed = true;
		}
		if (this.ui.textarea.val() !== "" && (this.model.data) && (this.model.data !== this.ui.textarea.val())) {
			changed = true;
		}

		if (changed) {
			App.needConfirmToLeave = true;
		}
	}
});