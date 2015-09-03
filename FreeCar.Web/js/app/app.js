(function () {
    var App = new Backbone.Marionette.Application();
    App.Models = {};
    App.Controllers = {};

    App.Views = {};

    App.Views.Controls = {};

    App.Constants = {};

    App.Globals = {

    };

    window.App = app;

    App.addInitializer(function () {

        App.router = new AppRouter();

        //App.router.on("route", function (route, params) {
        //	console.log("Different Page: " + route);
        //});

        Backbone.history.start({
            pushState: true
        });

        Backbone.history.bindLinks({ ignore: ".jDefaultLink" });

    });

    App.on("start", function (options) {
        alert("Start");
    });

    App.on("before:start", function () {
        alert("PreStrart");
    });


    App.addRegions({
        mainRegion: ".jMainRegion",
        modalRegion: ".jModalRegion"
    });
})();
