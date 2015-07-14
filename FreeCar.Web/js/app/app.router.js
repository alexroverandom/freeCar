App.on("before:start", function () {
	//var MyRouter, router;

	var MyRouter = Backbone.Marionette.AppRouter.extend({
		routes: {
			"": "default",
			"entities/": "root",
			"entities/:id/": "show",
			"entities/:id/:field/": "list",
			"settings/groups/": "settingGroups",
			"settings/group/:id/": "settingGroup",
			"settings/groups/:id/": "settings",
			"settings/:id/": "setting",
			"dictionaries/": "dictionaries",
			"dictionaries/:id/": "dictionary",
			"dictionaries/records/:id/": "dictionaryRecord",
			"dictionaries/:id/records/": "dictionaryRecords",

			"*notFound": "notFound"
		},
		_currentUrlFragment: "",
		_isListPage: false,
		before: function() {
			if (App.needConfirmToLeave) {
				var message = "Данные не сохранены." +
					"При переходе со страницы все изменения будут потеряны!" +
					"Вы точно хотите перейти со страницы?";

				if (!confirm(message)) {
					this.navigate(this._currentUrlFragment, {
						replace: true
					});
					return false;
				}
				App.needConfirmToLeave = false;
				
			}

			App.modalRegion.empty();
		},
		after: function() {
			this._currentUrlFragment = Backbone.history.fragment;
		},
		"default": function() {
			this._isListPage = false;
			Backbone.history.navigate("/entities/", {
				trigger: true
			});
		},
		notFound: function(fragment) {
			App.mainRegion.show(new App.Views.NotFound({
				model: new Backbone.ExtModel({
					url: fragment
				})
			}));
		},
		noPermission: function () {
			var view = new App.Views.NoPermissions();
			App.mainRegion.show(view);
		},
		root: function() {
			if (this.accessValidation([App.Constants.Roles.SectionManager, App.Constants.Roles.SuperUser])) {
				
				App.Controllers.Entities.root();
			} else {
				this.noPermission();
			}
		},
		list: function(id, field) {
			if (this.accessValidation([App.Constants.Roles.SectionManager, App.Constants.Roles.SuperUser])) {
				
				App.Controllers.Entities.list(id, field);
			} else {
				this.noPermission();
			}
		},
		show: function(id) {
			if (this.accessValidation([App.Constants.Roles.SectionManager, App.Constants.Roles.SuperUser])) {
				
				App.Controllers.Entities.show(id);
			} else {
				this.noPermission();
			}
		},
		settingGroups: function() {
			if (this.accessValidation([App.Constants.Roles.SettingsManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.SettingGroups.list();
			} else {
				this.noPermission();
			}
		},
		settingGroup: function(id) {
			if (this.accessValidation([App.Constants.Roles.SettingsManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.SettingGroups.show(id);
			} else {
				this.noPermission();
			}
		},
		settings: function(id) {
			if (this.accessValidation([App.Constants.Roles.SettingsManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.Settings.show(id);
			} else {
				this.noPermission();
			}
		},
		setting: function(id) {
			if (this.accessValidation([App.Constants.Roles.SettingsManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.Setting.show(id);
			} else {
				this.noPermission();
			}
		},
		dictionaries: function() {
			if (this.accessValidation([App.Constants.Roles.DictionaryManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.Dictionaries.list();
			} else {
				this.noPermission();
			}
		},
		dictionary: function(id) {
			if (this.accessValidation([App.Constants.Roles.DictionaryManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.Dictionaries.show(id);
			} else {
				this.noPermission();
			}
		},
		dictionaryRecords: function(id) {
			if (this.accessValidation([App.Constants.Roles.DictionaryManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.DictionaryRecords.show(id);
			} else {
				this.noPermission();
			}
		},
		dictionaryRecord: function(id) {
			if (this.accessValidation([App.Constants.Roles.DictionaryManager, App.Constants.Roles.SuperUser])) {
				App.Controllers.DictionaryRecord.show(id);
			} else {
				this.noPermission();
			}
		},
		validation: function (roles) {
			//if (App.Identity.Roles.length === 0) {
			//	$.ajax({
			//		url: "/auth/getuserroles/",
			//		type: "GET",
			//		success: function(result) {
			//			if (result) {
			//				var roles = result.split(",");
			//				roles.forEach(function(el) {
			//					App.Identity.Roles.push(el);
			//				});
			//				return App.Identity.Helpers.isInRoles(roles);
			//			}
			//		}
			//	});
			//} else {
			//	return App.Identity.Helpers.isInRoles(roles);
			//}
		},
		accessValidation: function(roles) {
			return App.Identity.Helpers.isInRoles(roles);
		}
	});
	var router = new MyRouter();
});

App.on("start", function () {
	Backbone.history.start({
		pushState: true,
		root: "/app/"
	});
	Backbone.history.bindLinks({
		ignore: ".jDefaultLink, .jTabNavigateLink"
	});
});

App.needConfirmToLeave = false;

App.vent.on("panel:closing", function (view, namespace) {
	if (App.needConfirmToLeave) {
		var message = "Данные не сохранены." +
			"При переходе или закрытии панели все изменения будут потеряны!" +
			"Вы точно хотите закрыть панель?";

		if (!confirm(message)) {

			return false;
		}

		App.needConfirmToLeave = false;
	}
	view.destroy();
	$(document).off("click." + namespace);
});
