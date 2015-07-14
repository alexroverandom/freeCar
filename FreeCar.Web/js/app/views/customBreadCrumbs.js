(function() {
	var tmplContext = ".jBreadcrumbsAppTmpls";

	App.Views.Entity.CustomBreadcrumb = Marionette.LayoutView.extend({
		template: tmplContext + " .jCustomBreadcrumbsTmpl"

	});
})();