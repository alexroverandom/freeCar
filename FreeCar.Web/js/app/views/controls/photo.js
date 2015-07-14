
App.Views.Controls.Photo = Marionette.ItemView.extend({
	getTemplate: function () {
		return MenuControlGetTemplate(this);
	},
	templateHelpers: function () {
		var that = this;
		return {
			isDeleted: function () {
				return that.options.isDeleted;
			},
			isSelected: function () {
				return that.options.isSelected;
			},
			hasFile: function () {
				return that.options.isSelected || (that.model.data.id !== Utils.uuid4.empty() && !that.options.isDeleted);

			},
			hasServerFile: function () {
				return that.model.data.id !== Utils.uuid4.empty();
			}
		};
	},
	ui: {
		photo: "[type=file]",
		desc: "[name=desc]",
		"delete": "[name=delete]",
		cancelDelete: "[name=cancelDelete]",
		cancelSelected: "[name=cancelSelected]",
		clientPreview: ".jClientPreview"
	},
	initialize: function () {
		_.extend(this.options, {
			isDeleted: false,
			isSelected: false,
			selectedFile: null
		});
		if (this.model.data == null) {
			this.model.data = {
				id: Utils.uuid4.empty()
			};
		}
	},
	events: {
		"change @ui.photo": function () {
			var that = this;
			var reader = new FileReader();
			reader.onload = function (e) {
				that.ui.clientPreview.attr("src", e.target.result);
			};
			reader.readAsDataURL(this.ui.photo[0].files[0]);
			this.model.data.name = this.ui.photo[0].files[0].name;
			this.options.isSelected = true;
			this.options.selectedFile = this.ui.photo[0].files[0];
			this.render();

			App.needConfirmToLeave = true;
		},
		"click @ui.cancelSelected": function () {
			this.ui.photo.val("");
			this.options.isSelected = false;
			this.options.selectedFile = null;
			this.render();



			return false;
		},
		"click @ui.delete": function () {
			this.options.isDeleted = true;
			this.render();

			App.needConfirmToLeave = true;

			return false;
		},
		"click @ui.cancelDelete": function () {
			this.ui.photo.val("");
			this.options.isSelected = false;
			this.options.selectedFile = null;
			this.options.isDeleted = false;
			this.render();
			return false;
		}
	},

	serializeData: function () {
		return _.extend({}, this.model.metadata.attrs, this.model.data, {
			rootUrl: this.model.rootUrl,
			cid: this.model.cid,
			structureId: this.model.structureId,
			isDisabled: this.model.isDisabled
		});
	},
	getData: function () {
		if (this.options.isSelected) {
			this.model.data.id = Utils.uuid4.new();
		} else if (this.options.isDeleted) {
			this.model.data.id = Utils.uuid4.empty();
		}
		return _.extend(this.model.data, {
			description: this.ui.desc.val()
		});
	},
	getFile: function () {
		if (this.options.selectedFile !== null) {
			return {
				id: this.model.data.id,
				file: this.options.selectedFile
			};
		}
	}
});
