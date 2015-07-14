App.Constants.VersionType = {
	entity: 0,
	draft: 1,
	backup: 2
};

(function () {
	var tmplContext = ".jEntityAppTmpls";

	var entityManagView = Marionette.LayoutView.extend({
		template: ".jEntityAppTmpls .jEntityManageLayoutTmpl",
		regions: {
			//entityManagPanel: ".jEntityManagPanel",
			entityVersionsManag: ".jEntityVersionsManag"
		},
		ui: {
			loadDraft: ".jLoadDraft",
			loadEntity: ".jLoadEntity",
			removeEntityBtn: ".jRemoveEntityBtn",
			showEntityBackups: ".jShowEntityBackupsBtn",
			editEntityInfo: ".jEditEntityInfoBtn",
		},
		events: {
			"click @ui.loadDraft": "loadDraft",
			"click @ui.loadEntity": "loadEntity",
			"click @ui.removeEntityBtn": "removeIt",
			"click @ui.showEntityBackups": "showEntityBackups",
			"click @ui.editEntityInfo": "editEntityInfo"
		},
		onRender: function () {
			this.entityVersionsManag.show(new App.Views.EntityVersionsManagView({
				model: this.model,
				controlsView: this.options.controlsView
			}));
		},
		removeIt: function (e) {
			e.preventDefault();
			var that = this;

			if (confirm("Внимание! Вы собираетесь удалить сущность, ее черновик, резервные копии и файлы и все дочерние элементы! Вы уверенны, что хотите это сделать?!")) {
				var targetId;
				if (this.model.entityVersion.type === App.Constants.VersionType.entity) {
					targetId = this.model.id;
				} else {
					targetId = this.model.entityVersion.parentId;
				}
				$.post("/api/entities/deletefull/?id=" + targetId)
					.done(function () {

						var parent = App.Collections.entities.get(that.model.parent.id);
						Backbone.history.navigate("/entities/" + that.model.parent.id + "/" + parent.currentChildrenName + "/", {
							trigger: true,
							replace: true
						});
					})
					.fail(function (xhr) {
						//console.log(xhr.responseJSON.exceptionMessage);
						alert("Ошибка! Невозможно удалить текущую сущность!");
					});
			}
			return false;
		},
		showEntityBackups: function (e) {
			e.preventDefault();
			App.modalRegion.show(new App.Views.BackupsLayout({ model: this.model }));

			this._hidePanel();

			return false;
		},
		editEntityInfo: function (e) {
			e.preventDefault();
			App.modalRegion.show(new App.Views.EntityInfo({ model: this.model }));

			this._hidePanel();

			return false;
		},
		loadDraft: function (e) {
			e.preventDefault();
			if (this.model.entityVersion.type !== App.Constants.VersionType.draft) {
				Backbone.history.navigate("/entities/" + this.model.draftId + "/", {
					trigger: true,
					replace: true
				});

				//App.Controllers.Entities.getDraftId(this.model.id).done(function (id) {
				//	Backbone.history.navigate("/entities/" + id + "/", {
				//		trigger: true,
				//		replace: true
				//	});
				//});
			}
			return false;
		},
		loadEntity: function (e) {
			e.preventDefault();
			if (this.model.entityVersion.type !== App.Constants.VersionType.entity) {
				Backbone.history.navigate("/entities/" + this.model.originalInfo.id + "/", {
					trigger: true,
					replace: true
				});
				//$.post("/api/entities/loadentity/?id=" + this.model.id).done(function (id) {
				//	Backbone.history.navigate("/entities/" + id + "/", {
				//		trigger: true,
				//		replace: true
				//	});
				//});
			}
			return false;
		},
		_hidePanel: function () {

			$(document).on("click", function (e) {
				var left = $(".jLeftPanel");

				if (left.length > 0) {
					//тыкнуто гдето в панели кроме
					var lchild = (!$(e.target).hasClass("jLeftPanel") && left.find(e.target).length > 0 && !$(e.target).hasClass("jCreateDraftFromVersBtn")) ||
						$(e.target).hasClass("jLeftPanel");

					var lchildBkp = $(e.target).hasClass("jCancelCreate") || $(e.target).parent().hasClass("jCancelCreate");

					if (!$(e.target).hasClass("jEditEntityInfoBtn") && !lchild && !lchildBkp) {
						$(".jLeftPanel").addClass("hide");
						$(document).off(e);
					}
				}
			});
		}
	});


	App.Views.Entity.Layout = Marionette.LayoutView.extend({
		template: tmplContext + " .jLayoutTmpl",
		regions: {
			entityInfo: ".jEntityInfo",
			controls: ".jControls",
			pageSructure: ".jPageSructure"
		},
		ui: {
			save: ".jSave",
			remove: ".jRemove",
			fixedHeader: ".jFixed"
		},
		events: {
			"click @ui.save": "save",
			"click @ui.remove": "removeIt",
			"click @pageSructure a": "scrollToBlock"
		},
		modelEvents: {
			"change": "onRender"
		},
		serializeData: function () {
			return this.model.data;
		},
		onRender: function () {

			var that = this;

			var fields = new Backbone.Collection();
			var ref = this.model.metadata;


			for (field in ref) {
				if (field === "$type") {
					continue;
				}
				var mdata = ref[field];

				var disabled = false;
				if (this.model.entityVersion.type === App.Constants.VersionType.entity 
					|| this.model.entityVersion.type === App.Constants.VersionType.backup) {
					disabled = true;
				}

				fields.add(new Backbone.ExtModel({
					field: field,
					control: mdata.attrs.control.type,
					metadata: mdata,
					data: this.model.data[field],
					rootUrl: this.model.data.url,
					structureId: field,
					isDisabled: disabled
				}));

			}


			var parentsArray = [];
			var getParentsOfParetns = function (parent) {
				if (parent) {
					parentsArray.push(parent);
					getParentsOfParetns(parent.parent);
				}
			};
			getParentsOfParetns(this.model.parent);

			//console.time("controls");

			this.controls.show(new App.Views.ControlsList({
				collection: fields
			}));
			//console.timeEnd("controls");

			App.Collections.Backups.fetch({ data: { id: this.model.originalInfo.id } });

			var manageView = new entityManagView({
				model: this.model,
				controlsView: this.controls.currentView
			});

			//console.time("pageHeaderRegion");

			//obs
			App.pageHeaderRegion.show(manageView);
			//console.timeEnd("pageHeaderRegion");

			//console.time("pageSructure");

			this.pageSructure.show(new App.Views.ControlsList({
				collection: fields,
				isMenu: true,
				tagName: "ul"
				//className: "nav bs-docs-sidenav"
			}));
			//console.timeEnd("pageSructure");
			this._mainHeaderHeight = $(".main_header").outerHeight();
			this.bindScrollToBlock();
			this.bindStructureSpidering();

			//App.vent.on("entity.save", function () {
			//	that.render();
			//});
		},
		onShow: function () {
			this.pageSructure.$el.height($(window).height() - this.pageSructure.$el.offset().top);
		},
		_mainHeaderHeight: 0,
		bindStructureSpidering: function () {
			var that = this;

			var structureElements = this.pageSructure.$el.find("[href]");
			var controlsElements = _.chain(this.controls.$el.find("[data-structure]"));
			var w = $(window);

			w.off("scroll.StructureSpidering");
			w.on("scroll.StructureSpidering", _.debounce(function () {

				structureElements.removeClass("active");

				var last = controlsElements.findLast(function (x) {
					var el = $(x);
					return el.is(":visible") && el.offset().top - that._mainHeaderHeight - 10 <= w.scrollTop();
				}).value();

				var structure = $(last).data("structure");

				var menuLink = structureElements.filter("[href=#" + structure + "]");

				menuLink.addClass("active").parents().find("> a[href]").addClass("active");

			}, 50));

		},
		bindScrollToBlock: function () {
			var that = this;

			var links = this.pageSructure.$el.find("a");
			var w = $(window);

			links.off("click");
			links.on("click", function (e) {
				var whereto = $("[data-structure=" + $(e.currentTarget).attr("href").slice(1) + "]");

				function scroll() {
					w.scrollTop(whereto.offset().top - that._mainHeaderHeight - 10);
				}

				whereto.parents(".collapse").on("shown.bs.collapse", scroll).collapse("show");

				scroll();
			});
		},
	});
})();


