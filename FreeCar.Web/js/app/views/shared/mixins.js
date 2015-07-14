App.Views.Mixins.PageView = (function () {
	function PageView() { }

	PageView.prototype.title = "";

	PageView.prototype.setTitle = function () {
		return document.title = _.isFunction(this.title) ? this.title() : this.title;
	};

	PageView.prototype.onRender = function () {
		return this.setTitle();
	};

	return PageView;

})();
