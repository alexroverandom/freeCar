App.Views.Helpers.showUiError = function ($el) {
	return $el.parent().addClass("has-error");
};
App.Views.Helpers.hideUiError = function ($el) {
	return $el.parent().removeClass("has-error");
};

