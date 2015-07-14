App.Models.SettingGroup = Backbone.ExtModel.extend({
});

App.Models.Setting = Backbone.ExtModel.extend({
});


App.Models.SettingGroupCollection = Backbone.Collection.extend({
	model: App.Models.SettingGroup,
	url: "/api/settings/getSettingGroups/"
});

App.Models.SettingsCollection = Backbone.Collection.extend({
	model: App.Models.Setting,
	url: "/api/settings/getSettings/",
	withSettingId: function (id) {
		var that = this;
		return $.get("/api/settings/getSetting/?id=" + id).done(function(data) {
			that.add(data, { merge: true });
		});
	}
});
