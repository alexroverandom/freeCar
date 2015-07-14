
App.Views.Controls.DatePicker = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	ui: {
		input: "input",
		submit: "[name=submit]"
	},
	events: {
		"click @ui.submit": function () {
			var now = new Date();
			var day = ("0" + now.getDate()).slice(-2);
			var month = ("0" + (now.getMonth() + 1)).slice(-2);
			var today = now.getFullYear() + "-" + month + "-" + day;
			//return
			this.ui.input.val(today);
			App.needConfirmToLeave = true;
		},
		"blur @ui.input": function() {
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
		return this.ui.input.val();
	}
});
