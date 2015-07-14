App.Identity = {
	Roles: [],
	Helpers: {
		isInRole: function (role) {
			var res = false;
			App.Identity.Roles.forEach(function (el) {
				if (el === role) {
					res = true;
				}
			});
			return res;
		},
		isInRoles: function (roles) {
			var that = this;
			var res = false;
			roles.forEach(function(el) {
				if (that.isInRole(el)) {
					res = true;
				}
			});
			return res;
		},
		isAllInRoles: function(roles) {
			var that = this;
			var res = true;
			roles.forEach(function (el) {
				if (!that.isInRole(el)) {
					res = false;
				}
			});
			return res;
		}
	}
};
