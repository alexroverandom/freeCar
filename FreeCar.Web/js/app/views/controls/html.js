(function () {
	var redactors = {
		tinymce: "tinymce",
		codemirror: "codemirror",
		textarea: "textarea"
	};

	var tinyMceCreated = false;

	function tinyMceInit() {
		if (!tinyMceCreated) {
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
				selector: "textarea#TinyMceViewTextarea",
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

			tinyMceCreated = true;
		}
	}

	function getWysiwygRedactor() {
		return tinymce;
	}

	var codeMirror = CodeMirror.fromTextArea($("#CodeMirrorViewTextarea").get(0), {
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

	var tinyMceViewClass = Marionette.ItemView.extend({
		el: $(".jHtmlControlEditor"),
		ui: {
			buttons: ".jButtons button",
			tinyMceViewTextarea: "#TinyMceViewTextarea",
			codeMirrorViewTextarea: "#CodeMirrorViewTextarea",
			textarea: ".jTextarea",
			tabs: ".jTabs > div",
			save: ".jSave"
		},
		events: {
			"click @ui.buttons": "showRedactorClick",
			"click @ui.save": "saveData",
			"click @ui.saveAndClose": "saveAndClose"
		},
		initialize: function () {
			var that = this;
			this.$el.on("hide.bs.modal", function () {
				if (that._hasChanging()) {
					return confirm("Есть изменения. При закрытии все изменения потеряются. Закрыть?");
				} else {
					return true;
				}
			});
		},
		open: function (currentRedactor, model) {

			this._model = model;
			this._data = model.data || "";

			this.$el.modal("show");

			this.showRedactor(currentRedactor);

		},
		saveData: function () {
			App.needConfirmToLeave = true;
			this.updateData();
			this._model.data = this._data;
			//App.vent.trigger("data:changed");
		},
		showRedactorClick: function (e) {
			this.updateData();
			this.showRedactor($(e.currentTarget).data("redactor"));
		},
		showRedactor: function (redactorTab) {

			if (this._model.isDisabled) {
				this.ui.save.hide();
			} else {
				this.ui.save.show();
			}

			this._activeRedactor = redactorTab || redactors.textarea;
			this.ui.buttons.removeClass(this._activeClass).filter("[data-redactor=" + this._activeRedactor + "]").addClass(this._activeClass);
			this.ui.tabs.addClass(this._hideClass).filter("[data-redactor=" + this._activeRedactor + "]").removeClass(this._hideClass);
			var data = this._data;
			switch (redactorTab) {
				case redactors.tinymce:
					var redactor = getWysiwygRedactor();
					redactor.activeEditor.setContent(data);
					break;
				case redactors.codemirror:
					codeMirror.setValue(data);
					break;
				default:
					this.ui.textarea.val(data);
			}
		},
		updateData: function () {
			var newData;
			switch (this._activeRedactor) {
				case redactors.tinymce:
					var redactor = getWysiwygRedactor();
					redactor.triggerSave();
					newData = this.ui.tinyMceViewTextarea.val();
					break;
				case redactors.codemirror:
					newData = codeMirror.getValue();
					break;
				default:
					newData = this.ui.textarea.val();
			}
			this._data = newData;
		},
		_hasChanging: function () {
			//App.needConfirmToLeave = true;
			this.updateData();
			
			if (typeof this._model.data === "undefined" && this._data === "") {
				return false;
			}
			return this._data !== this._model.data;
		},
		_activeRedactor: redactors.textarea,
		_model: null,
		_data: null,
		_activeClass: "active",
		_hideClass: "hide"
	});

	var tinyMceView = null;

	App.Views.Controls.Html = Marionette.ItemView.extend({
		getTemplate: function () {
			return MenuControlGetTemplate(this);
		},
		ui: {
			input: ".jHtml",
			buttons: ".jButtons button"
		},
		events: {
			"click @ui.buttons": "showRedactor"
		},
		modelEvents: {
			"change": "render"
		},
		serializeData: function () {
			return _.extend({}, this.model.metadata.attrs, {
				val: this.model.data,
				cid: this.model.cid,
				structureId: this.model.structureId,
				isDisabled: this.model.isDisabled
			});
		},
		onRender: function () {
			if (!this.options.isMenu) {
				this.addElement();
				tinyMceInit();
			}
		},
		addElement: function () {
			var newDiv = document.createElement("div");
			newDiv.innerHTML = this.model.data || "";
			this.ui.input.get(0).innerHTML = newDiv.innerHTML;
		},
		showRedactor: function (e) {
			var that = this;

			var currentRedactor = $(e.currentTarget).data("redactor");

			if (!tinyMceView) {
				tinyMceView = new tinyMceViewClass();
				tinyMceView.bindUIElements();
				App.htmlControlEditorRegion.attachView(tinyMceView);
			}

			tinyMceView.open(currentRedactor, that.model);

		},
		getData: function () {
			return this.model.data;
		},

	});



})();