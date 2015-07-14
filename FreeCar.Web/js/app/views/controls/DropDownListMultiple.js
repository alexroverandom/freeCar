
App.Views.Controls.DropDownListMultiple = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	templateHelpers: function () {
		var that = this;
		return {
			isSelected: function (id) {
				return that.model.data && !(that.model.data.indexOf(parseInt(id)) === -1);
			}
		}
	},
	ui: {
		input: "select"
	},
	events: {
		"change @ui.input": function () {
			App.needConfirmToLeave = true;
		}
	},
	serializeData: function () {
		return _.extend({}, {
			title: this.model.attributes.metadata.attrs.control.title,
			values: this.model.attributes.metadata.attrs.dataProvider.source.$values,
			cid: this.model.cid,
			structureId: this.model.structureId,
			isDisabled: this.model.isDisabled
		});
	},
	getData: function () {
		return this.ui.input.val();
	}
});


