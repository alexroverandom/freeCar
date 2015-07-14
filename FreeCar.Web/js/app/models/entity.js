
App.Models.Entity = Backbone.ExtModel.extend({
	urlRoot: "/api/entities/",
	fetch: function () {
		var that = this;
		return $.get("/api/entities/details/?id=" + this.id).then(function (data) {
			that.set(data);
			return that;
		});
	},
	save: function () {
		return $.post("/api/entities/save/?id=" + this.id, "=" + (JSON.stringify(this.data))).done(function () {
			console.log("save ok");
		});
	}
});

App.Models.EntityCollection = Backbone.Collection.extend({
	model: App.Models.Entity,
	children: function (id, field) {
		var that = this;
		return $.get(this.model.prototype.urlRoot + "children/?id=" + id + "&field=" + field)
		    .then(function (data) {
		    	/*silent - пока хак, чтобы у моделей не триггерился change и не происходило onRender у вьюшки entity,
				эта ситуация возникает, когда жмешь "назад" в браузере, находясь на странице сущности, а предыдущая при этом - список сущностей,
				она вызывает этот метод
				*/
		    	return that.add(data, { merge: true, silent: true });
		    });
	},
	fetch: function (id) {
		var that = this;
		return $.get("/api/entities/details/?id=" + id).then(function (data) {
			that.set(data);
			return that;
		});
	},
	root: function () {

		var res = this.filter(function(item) {
			return !item.parent && ((item.entityVersion.type === App.Constants.VersionType.entity) || (item.entityVersion.type === "Entity"));
		});

		return new App.Models.EntityCollection(res);
	}
});



