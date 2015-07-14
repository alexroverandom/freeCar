
(function () {
	$.views.helpers({
		_: _,
		canMakePagesUndeletable: function() {
			return App.Identity.Helpers.isInRole(App.Constants.Roles.SuperUser);
		},
		canMakeUrlUneditable: function() {
			return App.Identity.Helpers.isInRole(App.Constants.Roles.SuperUser);
		},


		//canDeleteEntities: function() {
		//	return App.Identity.Helpers.isAllInRoles([App.Constants.Roles.SectionManager, App.Constants.Roles.Deletor]);
		//},
		//canUpdateEntities: function () {
		//	return App.Identity.Helpers.isAllInRoles([App.Constants.Roles.SectionManager, App.Constants.Roles.Updator]);
		//},
		//canCreateEntities: function () {
		//	return App.Identity.Helpers.isAllInRoles([App.Constants.Roles.SectionManager, App.Constants.Roles.Creator]);
		//},


		canCreateDictionary: function () {
			return App.Identity.Helpers.isInRole(App.Constants.Roles.SuperUser);
		},


		canCreateSettings: function () {
			return App.Identity.Helpers.isInRole(App.Constants.Roles.SuperUser);
		},


		isInRole: function (role) {
			var res = false;
			App.Identity.Roles.forEach(function (el) {
				if (el === role) {
					res = true;
				}
			});
			return res;
		}
	});
})();
