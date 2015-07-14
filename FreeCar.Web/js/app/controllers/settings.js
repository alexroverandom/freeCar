App.Controllers.SettingGroups = {
	list: function () {
		var that = this;
		App.Collections.SettingGroups.fetch().done(function (data) {
			App.mainRegion.show(new App.Views.SettingGroups({
				collection: App.Collections.SettingGroups
			}));
			//App.breadCrumbsRegion.reset();

			App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
				collection: new Backbone.Collection(that._createGroupsBreadcrumbs())
			}));
		});
	},
	show: function (id) {
		var that = this;
		$.get("/api/settings/getSettingGroup/?id=" + id).done(function (obj) {
			App.mainRegion.show(new App.Views.SettingGroupView({
				model: new Backbone.ExtModel(obj)
			}));

			App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
				collection: new Backbone.Collection(that._createGroupBreadcrumbs(obj.nameAdmin))
			}));
		});
	},
	_createGroupsBreadcrumbs: function() {
		var arr = [];

		arr.push({ title: "Группы настроек" });

		return arr;
	},
	_createGroupBreadcrumbs: function (title) {
		var arr = [];

		arr.push({
			title: title
		});

		arr.push({
			parent: {
				title: "Группы настроек",
				url: "settings/groups"
			}
		});
		return arr;
	}
};

App.Controllers.Settings = {
	show: function (id) {
		var that = this;
		App.Collections.SettingGroups.fetch().done(function () {

			var group = App.Collections.SettingGroups.get(id);

			App.mainRegion.show(new App.Views.Settings({ model: group }));

			App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
				collection: new Backbone.Collection(that._createBreadcrumbs(group))
			}));
		});
	},
	_createBreadcrumbs: function (group) {
		var arr = [];

		arr.push({ title: group.nameAdmin });

		arr.push({
			parent: {
				title: "Группы настроек",
				url: "settings/groups"
			}
		});
		return arr;
	}
}

App.Controllers.Setting = {
	show: function (id) {
		var that = this;
		App.Collections.SettingGroups.fetch().done(function () {
			App.Collections.Settings.withSettingId(id).done(function () {
				var setting = App.Collections.Settings.get(id);
				if (setting) {
					App.Collections.DictionaryRecords.fetch().done(function () {

						App.mainRegion.show(new App.Views.Setting({ model: setting }));

						App.breadCrumbsRegion.show(new App.Views.Entity.CustomBreadcrumb({
							collection: new Backbone.Collection(that._createBreadcrumbs(setting))
						}));
					});
				}
			});
		});
	},
	_createBreadcrumbs: function (setting) {
		var arr = [];

		arr.push({
			title: setting.nameAdmin
		});

		var settGroup = App.Collections.SettingGroups.get(setting.settingGroupId);

		arr.push({
			parent: {
				title: settGroup.nameAdmin,
				url: "settings/groups/" + setting.settingGroupId
			}
		});

		arr.push({
			parent: {
				title: "Группы настроек",
				url: "settings/groups"
			}
		});

		return arr;
	}
}