
(function () {
	Backbone.Models.EnumMember = Backbone.ExtModel.extend(_.extend({}, Backbone.Models.Mixins.Idable));
	Backbone.Models.EnumCollection = Backbone.Collection.extend({
		model: Backbone.Models.EnumMember,
		getInvariant: function (id) {
			if (id == null) {
				id = "";
			}
			return this.find(function (e) {
				return e.id.toLowerCase() === id.toLowerCase();
			});
		}
	});
})();
