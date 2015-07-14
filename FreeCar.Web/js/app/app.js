
(function () {
	//var app;
	var app = new Marionette.Application({
		Common: {
			KEY: {
				ENTER: 13,
				ESC: 27
			},
			DATEFORMAT: "DD.MM.YYYY",
			DATEPICKER_DATEFORMAT: "YYYY-MM-DD"
		},
		Collections: {},
		Settings: {}
	});

	app.Models = {};

	app.Controllers = {};
	app.Constants = {
		Roles: {
			DictionaryManager: "DictionaryManager",
			SettingsManager: "SettingsManager",
			SectionManager: "SectionManager",
			SuperUser: "SuperUser"
		}
	};

	app.addRegions({
		headerRegion: ".jHeaderRegion",
		mainRegion: ".jMainRegion",
		modalRegion: ".jModalRegion",
		breadCrumbsRegion: ".jBreadcrumbsRegion",
		pageHeaderRegion: ".jPageHeaderRegion",
		htmlControlEditorRegion: ".jHtmlControlEditorRegion",
	});

	window.App = app;


	$(".jMainMenuToggle").click(function () {
		$(".jMainContextMenu").toggleClass("hide");


		$("html").on("click", function (e) {
			if ((!$(e.target).hasClass("jMainMenuToggle")) && (!$(e.target).parent().hasClass("jMainMenuToggle"))) {
				$(".jMainContextMenu").addClass("hide");
				$("html").off(e);
			}
		});
	});

	app.pageHeaderRegion.on("show", function () {
		//currentChildrenName
		//children.$values.fieldName
		var title;
		if (this.currentView.model) {
			
			if (this.currentView.model.nameAdmin) {
				title = this.currentView.model.nameAdmin;
			}

			if (this.currentView.model.title) {
				title = this.currentView.model.title;
			}


			//title = this.currentView.templateHelpers.getTitle();

			if (this.currentView.model.children && this.currentView.model.children.$values.length > 0) {
				var childName = this.currentView.model.currentChildren;
				if (childName) {
					var child = _.find(this.currentView.model.children.$values, function (item) {
						return item.fieldName == childName;
					});
					title = child.name;
				}
				
			}


			
		} else {
			title = "Разделы";
		}

		document.title = title;

	});

})();
