(function () {

	var tmplContext = ".jSharedTmpls";

	App.Views.ControlsList = Marionette.CollectionView.extend({
		childViewOptions: function () {
			return {
				isMenu: this.options.isMenu
			}
		},
		getChildView: function (item) {
			return App.Views.Controls[item.control];
		}
	});


	App.Views.PageHeader = Marionette.LayoutView.extend({
		template: tmplContext + " .jPageHeaderTmpl",
		regions: {
			entityManagRegion: ".jEntityManagRegion"
			//manageBtns: ".jManageBtns",
			//entityInfoRegion: ".jEntityInfoRegion",
			//entityVersionRegion: ".jEntityVersionRegion"
		},
		onRender: function () {
			if (this.options.entityManagView) {
				this.entityManagRegion.show(this.options.entityManagView);
			}
			//if (this.options.entityInfoView) {
			//	this.entityInfoRegion.show(this.options.entityInfoView);
			//}
			//if (this.options.entityVersionView) {
			//	this.entityVersionRegion.show(this.options.entityVersionView);
			//}
		}
	});


	App.Views.NotFound = Marionette.ItemView.extend({
		title: "404",
		template: tmplContext + " .jNotFoundTmpl"
	});
	App.Views.NoPermissions = Marionette.ItemView.extend({
		title: "No permissions",
		template: " .jNoPermissionsTmpl"
	});
	App.Views.Header = Marionette.ItemView.extend({
		template: tmplContext + " .jHeaderTmpl"
	});
	App.Views.ProjectHeader = Marionette.ItemView.extend({
		template: tmplContext + " .jProjectHeaderTmpl"
	});
	App.Views.ProjectNavigator = Marionette.ItemView.extend({
		template: tmplContext + " .jProjectNavigatorTmpl"
	});


})();
