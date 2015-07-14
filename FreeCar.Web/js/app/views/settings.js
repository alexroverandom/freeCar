App.Views.CustomHeader = Marionette.ItemView.extend({
	template: ".jCustomHeaderLayoutTmpl"
});



App.Views.SettingGroupHeader = Marionette.ItemView.extend({
	template: ".jSettingGroupHeaderTmpl",
	ui: {
		"save": ".jSave"
	},
	events: {
		"click @ui.save": "save"
	},
	save: function () {
		if (this.options.settingGroupView) {

			var view = this.options.settingGroupView;

			var elm = view.$el.find("[name]");
			var res = {};
			elm.each(function (i, item) {
				var propName = item.attributes.name.value;

				if (item.type === "text" || item.type === "select-one" || item.type === "hidden") {
					res[propName] = item.value;
				}

			});
			res.id = this.model.id;
			$.post("/api/settings/updateSettingGroup/", res).done(function (data) {
				view.model.set(data);
				view.render();
				alert("Сохранено!");
			});
		}
	}
});

App.Views.SettingGroupView = Marionette.ItemView.extend({
	template: ".jSettingGroupTmpl",
	onRender: function () {
		//dictView
		App.pageHeaderRegion.show(new App.Views.SettingGroupHeader({
			model: this.model,
			settingGroupView: this
		}));
	}
});

App.Views.SettingGroupsCreation = Marionette.ItemView.extend({
	template: ".jSettingGroupsCreationTmpl",
	ui: {
		createBtn: ".jCreateBtn",
		createBlock: ".jControls",
		closePanelBtn: ".jClosePanelBtn",
		input: "[name=code]"
	},
	events: {
		"click @ui.createBtn": "create",
		"click @ui.closePanelBtn": "closePanel",
		"keypress @ui.input": function (e) {
			if (("0123456789").indexOf(String.fromCharCode(e.keyCode)) === -1) {
				e.preventDefault();
				return false;
			}
			return true;
		},
	},
	create: function () {
		$.get("/api/settings/createSettingGroup/?code=" + this.ui.input.val()).done(function (id) {

			Backbone.history.navigate("/settings/group/" + id + "/", {
				trigger: true
			});

		});
	},
	onRender: function () {
	},
	closePanel: function () {
		this.destroy();
	}
});

App.Views.SettingGroupsHeader = Marionette.ItemView.extend({
	template: ".jSettingGroupsHeaderTmpl",
	ui: {
		showBtn: ".jShowBtn"
	},
	events: {
		"click @ui.showBtn": "showPanel"
	},
	showPanel: function () {
		var view = new App.Views.SettingGroupsCreation();

		App.modalRegion.show(view);

		$(document).on("click", function (e) {

			var right = $(".jRightPanel");
			if (right.length > 0) {

				var child = (!$(e.target).hasClass("jRightPanel") && (right.find(e.target).length !== 0 && !$(e.target).hasClass("jCreateBtn"))) ||
					$(e.target).hasClass("jRightPanel");

				if (!$(e.target).hasClass("jShowBtn") && !child) {
					$(".jRightPanel").addClass("hide");
					//App.vent.trigger("panel:closing", view, "entity-create");
					view.destroy();
					$(document).off(e);
				}
			}
		});

	}

});

App.Views.SettingGroups = Marionette.ItemView.extend({
	template: ".jSettingsGroupsTmpl",
	onRender: function () {
		App.pageHeaderRegion.show(new App.Views.SettingGroupsHeader({
			model: this.model
		}));
	}
});

App.Views.SettingsCreation = Marionette.ItemView.extend({
	template: ".jSettingsCreationTmpl",
	ui: {
		createBtn: ".jCreateBtn",
		createBlock: ".jControls",
		closePanelBtn: ".jClosePanelBtn",
		input: "[name=code]",
		select: "[name=type]"
	},
	events: {
		"click @ui.createBtn": "create",
		"click @ui.closePanelBtn": "closePanel",
		"keypress @ui.input": function (e) {
			if (("0123456789").indexOf(String.fromCharCode(e.keyCode)) === -1) {
				e.preventDefault();
				return false;
			}
			return true;
		},
	},
	create: function () {
		$.post("/api/settings/createSetting/", {
			code: this.ui.input.val(),
			type: this.ui.select.val(),
			settingGroupId: this.model.id
		}).done(function (id) {

			Backbone.history.navigate("/settings/" + id + "/", {
				trigger: true
			});

		});
	},
	onRender: function () {
	},
	closePanel: function () {
		this.destroy();
	}
});

App.Views.SettingsHeader = Marionette.ItemView.extend({
	template: ".jSettingsHeaderTmpl",
	ui: {
		showBtn: ".jShowBtn"
	},
	events: {
		"click @ui.showBtn": "showPanel"
	},
	showPanel: function () {
		var view = new App.Views.SettingsCreation({
			model: this.model
		});

		App.modalRegion.show(view);

		$(document).on("click", function (e) {

			var right = $(".jRightPanel");
			if (right.length > 0) {

				var child = (!$(e.target).hasClass("jRightPanel") && (right.find(e.target).length !== 0 && !$(e.target).hasClass("jCreateBtn"))) ||
					$(e.target).hasClass("jRightPanel");

				if (!$(e.target).hasClass("jShowBtn") && !child) {
					$(".jRightPanel").addClass("hide");
					//App.vent.trigger("panel:closing", view, "entity-create");
					view.destroy();
					$(document).off(e);
				}
			}
		});

	}
});

App.Views.Settings = Marionette.ItemView.extend({
	template: ".jSettingsTmpl",
	onRender: function () {
		App.pageHeaderRegion.show(new App.Views.SettingsHeader({
			model: this.model
		}));
	}
});

App.Views.SettingHeader = Marionette.ItemView.extend({
	template: ".jSettingHeaderTmpl",
	ui: {
		saveBtn: ".jSave"
	},
	events: {
		"click @ui.saveBtn": "save"
	},
	save: function () {

		var view = this.options.settingView;

		if (view._tinyEnabled) {
			tinymce.triggerSave();
			tinymce.remove("textarea.jHtml");
			view._tinyEnabled = false;
		}

		if (view._codeMirrorEnabled) {
			$(".jHtml").val(view._codemirror.getValue());
		}

		if (view) {

			var elm = view.$el.find("[name]");
			var res = {};
			elm.each(function (i, item) {
				var propName = item.attributes.name.value;
				if (item.type === "text" || item.type === "select-one" || item.type === "hidden") {
					res[propName] = item.value;
				}
				if (item.type === "textarea") {
					res[propName] = item.value;
				}
				if (item.type === "checkbox") {
					res[propName] = item.checked;
				}
				if (item.type === "select-multiple") {
					res[propName] = [];
					var arr = res[propName];
					for (var t = 0; t < item.options.length; t++) {
						if (item.options[t].selected) {
							arr.push(item.options[t].value);
						}
					}

				}

			});

			res.id = this.model.id;

			if (!res.code) {
				res.Code = this.model.code;
			}
			if (!res.nameAdmin) {
				res.nameAdmin = this.model.nameAdmin;
			}
			if (!res.controlType) {
				if (this.model.controlType) {
					res.controlType = this.model.controlType;
				}
			}

			$.post("/api/settings/saveSetting/", res).done(function (data) {
				

				var model = App.Collections.Settings.get(data.id);
				model.set(data);

				$(".jHtml").addClass("hide");
				$(".jHtmlView").toggleClass("hide");

				alert("Saved!");

				view.render();
			});
		}
	}
});

App.Views.Setting = Marionette.ItemView.extend({
	_codemirror: null,
	_tinyEnabled: false,
	_codeMirrorEnabled: false,
	template: ".jSettingTmpl",
	templateHelpers: {
		getDictionaryRecords: function () {

			return App.Collections.DictionaryRecords.toArray();
		}
	},
	ui: {
		activateTinyMceBtn: ".jTinyMceActivateBtn",
		activateCodeMirrorBtn: ".jCodeMirrorActivateBtn",
		html: ".jHtml",
		htmlView: ".jHtmlView"
	},
	events: {
		"click @ui.activateTinyMceBtn": "activateTinyMce",
		"click @ui.activateCodeMirrorBtn": "activateCodeMirror"
	},
	onRender: function () {
		App.pageHeaderRegion.show(new App.Views.SettingHeader({
			model: this.model,
			settingView: this
		}));
		//if (!this._tinyEnabled) {
		//	this.activateTinyMce();
		//}
	},
	onShow: function () {

		if (this.model.controlType === 2) {
			if (!this._tinyEnabled) {
				this.activateTinyMce();
			}
		}
	},
	activateTinyMce: function () {
		if (this._codeMirrorEnabled) {
			this._codeMirrorEnabled = false;
			this.ui.html.val(this._codemirror.getValue());
			this._codemirror.toTextArea();
		}
		
		this._tinyEnabled = true;

		tinymce.triggerSave();
		tinymce.remove("textarea.jHtml");

		this.ui.htmlView.addClass("hide");
		this.ui.html.toggleClass("hide");


		function roxyFileBrowser(fieldName, url, type, win) {
			var roxyFileman = "/filemanager/interface/";
			if (roxyFileman.indexOf("?") < 0) {
				roxyFileman += "?type=" + type;
			} else {
				roxyFileman += "&type=" + type;
			}
			roxyFileman += "&input=" + fieldName + "&value=" + win.document.getElementById(fieldName).value;
			if (tinymce.activeEditor.settings.language) {
				roxyFileman += "&langCode=" + tinymce.activeEditor.settings.language;
			}
			tinymce.activeEditor.windowManager.open({
				file: roxyFileman,
				title: "Roxy Fileman",
				width: 850,
				height: 650,
				resizable: "yes",
				plugins: "media",
				inline: "yes",
				close_previous: "no"
			}, { window: win, input: fieldName });
			return false;
		};

		tinymce.init({
			selector: "textarea.jHtml",
			theme: "modern",
			plugins: [
				"advlist autolink lists link image charmap print preview hr anchor pagebreak",
				"searchreplace wordcount visualblocks visualchars code fullscreen",
				"insertdatetime media nonbreaking save table contextmenu directionality",
				"emoticons template paste textcolor"
			],
			toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | forecolor backcolor",
			file_browser_callback: roxyFileBrowser,
			image_advtab: true,
			valid_elements: "*[*]",
			relative_urls: false,
			forced_root_block: "",
			language: "ru",
			language_url: "/bundles/js/tinymce/langs",
			skin_url: "/bundles/css/tinymce/skins"
		});

		//	tinyMceCreated = true;
		//}
	},

	activateCodeMirror: function () {

		this._codeMirrorEnabled = true;
		this.ui.htmlView.addClass("hide");
		if (this._tinyEnabled) {
			this._tinyEnabled = false;
			tinymce.triggerSave();
			tinymce.remove("textarea.jHtml");
		}

		this._codemirror = CodeMirror.fromTextArea($(".jHtml").get(0), {
			lineNumbers: 0,
			lineWrapping: true,
			matchBrackets: true,
			autoCloseBrackets: true,
			matchTags: true,
			autoCloseTags: true,
			styleActiveLine: 0,
			extraKeys: {
				"Ctrl-Space": "autocomplete",
				"F11": function (cm) {
					cm.setOption("fullScreen", !cm.getOption("fullScreen"));
				},
				"Esc": function (cm) {
					if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
				}
			},
			mode: "htmlmixed"
		});

		this._codemirror.setValue(this.ui.html.val());
	}
});