var AppRouter = Marionette.AppRouter.extend({
    parseId: function (id) {
        if (id) {
            id = _.parseInt(id);
        }
        return id;
    },

    //добавить в практики
    route: function (route, name, callback) {
        var router = this;
        if (!callback) callback = this[name];

        var f = function () {
            callback.apply(router, arguments);
        };
        return Backbone.Router.prototype.route.call(this, route, name, f);
    },
    routes: {
        "categories/": "categories",
        "categories/:id/children/": "categories"
    },
    categories: function (id) {
        App.Controllers.Categories.show(this.parseId(id));
    }
});
