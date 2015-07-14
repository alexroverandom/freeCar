App.Views.EntityInfo = Marionette.ItemView.extend({
	template: ".jEntityInfoTmpl",
	//getTemplate: function () {
	//	return MenuControlGetTemplate(this);
	//},
	ui: {
		input: ".jUrlSegment",
		dropdown: "select",
		adminInfoBlock: ".jAdminInfoBlock",
		editBtn: ".jEditInfoBtn",
		editBlock: ".jEditInfoBlock",
		saveBtn: ".jPreSaveBtn",
		saveConfirmBtn: ".jSaveConfirmBtn",
		cancelBtn: ".jCancelBtn",
		alertBlock: ".jAlertBlock",
		saveBlock: ".jSaveBlock",
		cancelConfirmBtn: ".jCancelConfirmBtn",
		closePanel: ".jClosePanelBtn",
		isNotDeletable: ".jIsNotDeletable",
		isNotEditableUrl: ".jIsNotEditableUrl"
	},
	events: {
		"keypress @ui.input": function (e) {
			if (("abcdefghijklmnopqrstuvwxyz -_0123456789").indexOf(String.fromCharCode(e.keyCode)) === -1) {
				e.preventDefault();
				return false;
			}
			return true;
		},
		"click @ui.editBtn": "showInfo",
		"click @ui.saveBtn": "save",
		"click @ui.saveConfirmBtn": "saveConfirm",
		"click @ui.cancelBtn": "cancel",
		"click @ui.cancelConfirmBtn": "cancelConfirm",
		"click @ui.closePanel": "closePanel"
	},
	getData: function () {

		return {
			urlSegment: this.ui.input.val(),
			visibility: parseInt(this.ui.dropdown.val()),
			isNotDeletable: this.ui.isNotDeletable[0] ? this.ui.isNotDeletable[0].checked : this.model.originalInfo.entityVersion.isNotDeletable,
			isNotEditableUrl: this.ui.isNotEditableUrl[0] ? this.ui.isNotEditableUrl[0].checked : this.model.originalInfo.entityVersion.isNotEditableUrl
		}
	},
	showInfo: function () {


		this.ui.editBlock.toggleClass("hide");
		this.ui.adminInfoBlock.addClass("hide");
	},
	save: function () {

		this.ui.saveBlock.addClass("hide");
		this.ui.alertBlock.toggleClass("hide");

	},
	saveConfirm: function () {
		var cur = this.getData();
		var that = this;
		//todo: versinfo & isNotDeletable & isNotEditableUrl
		var obj = {
			id: this.model.originalInfo.id,
			urlSegment: cur.urlSegment,
			visibility: cur.visibility,
			entityVersion: {
				isNotDeletable: cur.isNotDeletable,
				isNotEditableUrl: cur.isNotEditableUrl
			}
		}
		$.post("/api/entities/saveurl/", obj).done(function (data) {
			that.model.originalInfo.urlSegment = data.urlSegment;
			that.model.originalInfo.url = data.url;
			that.model.originalInfo.visibility = cur.visibility;
			that.model.originalInfo.entityVersion.isNotDeletable = cur.isNotDeletable,
			that.model.originalInfo.entityVersion.isNotEditableUrl = cur.isNotEditableUrl,

			that.render();

			App.pageHeaderRegion.currentView.render();
		})
		.fail(function (err) {
			alert("Не удалось сохранить данные!");
		});
	},
	cancel: function () {
		this.ui.adminInfoBlock.toggleClass("hide");
		this.ui.editBlock.addClass("hide");
	},
	cancelConfirm: function () {
		this.ui.saveBlock.toggleClass("hide");
		this.ui.alertBlock.addClass("hide");
	},
	closePanel: function () {
		this.destroy();
	}
});


App.Views.EntityVersionsManagView = Marionette.ItemView.extend({
	template: ".jEntityVersionsManagTmpl",
	//_draftId: "",
	_isDraft: false,
	_isBackup: false,
	_isEntity: false,
	initialize: function () {
		_.extend(this.options,
			{
				versionsColl: new Backbone.Collection()
			});
	},
	ui: {
		createDraftBtn: ".jCreateDraftBtn",
		saveDraftBtn: ".jSaveDraftBtn",
		publishBtn: ".jPublishDraftBtn",
		deleteBtn: ".jDeleteDraftBtn",
		createBackup: ".jCreateBackupBtn",
	},
	events: {
		"click @ui.createDraftBtn": "createDraft",
		"click @ui.saveDraftBtn": "saveDraft",
		"click @ui.publishBtn": "publish",
		"click @ui.deleteBtn": "removeIt",
		"click @ui.createBackup": "createBackup",
	},
	onRender: function () {
		var that = this;
		//console.log(this.model);
		if (this.model.entityVersion.type === App.Constants.VersionType.draft) {
			this._isDraft = true;
		}
		if (this.model.entityVersion.type === App.Constants.VersionType.backup) {
			this._isBackup = true;
		}
		if (this.model.entityVersion.type === App.Constants.VersionType.entity) {
			this._isEntity = true;
		}

		if ((!this._isDraft) && this.model.hasDraft) {

			var id;
			if (this._isEntity) {
				id = this.model.id;
			} else {
				id = this.model.originalInfo.id;
			}

			//App.Controllers.Entities.getDraftId(id).done(function (draftId) {
			//	that._draftId = draftId;
			//});
			//that._draftId = 
		}
	},
	createDraft: function (e) {
		e.preventDefault();
		var vers = {
			id: this.model.originalInfo.id,
			versionType: App.Constants.VersionType.draft,
			comment: "черновик"
		};
		var that = this;
		$.post("/api/entities/createbackup/", vers).done(function (id) {
			if (!id) {
				alert("Ошибка! Нельзя выполнить данное действие, так как черновик уже создан. Удалите/Опобликуйте активный черновик и повторите попытку.");
			} else {
				that.model.hasDraft = true;
				if (that._isEntity) {
					that.model.draftId = id;
				}
				Backbone.history.navigate("/entities/" + id + "/", {
					trigger: true,
					replace: true
				});
			}
		});
		return false;
	},
	publish: function (e) {
		e.preventDefault();
		App.needConfirmToLeave = false;
		this.save(true);
		return false;
	},
	saveDraft: function () {
		App.needConfirmToLeave = false;
		this.save();

	},
	save: function (publish) {
		var controls = this.options.controlsView;

		if (this._isDraft) {


			var ref = controls.children.toArray();

			for (var i = 0; i < ref.length; i++) {
				var view = ref[i];
				this.model.data[view.model.field] = view.getData();
			}
		}

		//return;
		var fd = new FormData();
		var files = _.chain(controls.children.toArray()).map(function (c) {
			return typeof c.getFile === "function" ? c.getFile() : void 0;
		}).flatten().compact().value();
		for (var j = 0; j < files.length; j++) {
			var f = files[j];
			fd.append(f.id, f.file);
		}
		//не передавать, если не драфт
		if (this._isDraft) {
			fd.append("data", JSON.stringify(this.model.data));
		}

		var id;
		if (this._isDraft) {
			id = this.model.id;
		} else {
			id = this.model.draftId;
		}

		fd.append("id", id);

		var that = this;

		var xhr = new XMLHttpRequest();
		var uploadComplete = function () {
			if (xhr.status === 200) {
				var obj = JSON.parse(xhr.response);

				if (that._isEntity || (that._isDraft && !publish)) {
					that.model.set(obj);
					console.log("saveComplete");

					//TODO: сделать нормальные уведомления
					alert("Сохранено!");
					//App.breadCrumbsRegion.show(new App.Views.Entity.Breadcrumb({
					//	currentEntity: that.model
					//}));

					App.vent.trigger("entity.save");
				}

				if (publish) {
					that.model.hasDraft = false;

					if (that._isDraft || that._isBackup) {
						Backbone.history.navigate("/entities/" + that.model.originalInfo.id + "/", {
							trigger: true,
							replace: true
						});
					}
				}

			}
		};
		xhr.addEventListener("load", uploadComplete, false);
		if (publish) {
			xhr.open("POST", "/api/entities/publish/");
		} else {
			xhr.open("POST", "/api/entities/save/");
		}

		//return
		xhr.send(fd);

	},
	removeIt: function (e) {
		e.preventDefault();
		var that = this;

		if (confirm("Внимание! Будет удален черновик! Вы уверенны, что хотите это сделать?!")) {

			var id;
			if (this._isDraft) {
				id = this.model.id;
			} else {
				id = this.model.draftId;
			}

			$.post("/api/entities/delete/?id=" + id)
				.done(function () {

					//var parent = App.Collections.entities.get(that.model.parent.id);


					Backbone.history.navigate("/entities/" + that.model.originalInfo.id + "/", {
						trigger: true,
						replace: true
					});
					that.model.hasDraft = false;
				})
				.fail(function (xhr) {
					//console.log(xhr.responseJSON.exceptionMessage);
					alert("Ошибка! Невозможно удалить текущую сущность!");
				});
		}
		return false;
	},
	createBackup: function (e) {
		e.preventDefault();
		App.modalRegion.show(new App.Views.BackupsLayout({ model: this.model, canCreateBackup: true }));
		return false;
	}
});

App.Views.BackupsLayout = Marionette.LayoutView.extend({
	template: ".jBackupLayoutTmpl",
	ui: {
		closePanel: ".jClosePanelBtn",
		createBackupBtn: ".jCreateBackupBtn"
	},
	events: {
		"click @ui.closePanel": "close",
		"click @ui.createBackupBtn": "createBkp"
	},
	regions: {
		backupListRegion: ".jBackupListRegion",
		backupCreateRegion: ".jBackupCreateRegion"
	},
	onRender: function () {
		if (this.options.canCreateBackup) {
			this.backupCreateRegion.show(new App.Views.BackupCreating({ model: this.model }));
		}
		this.backupListRegion.show(new App.Views.EntityBackupsView({
			collection: App.Collections.Backups
		}));
	},
	close: function () {
		this.destroy();
	},
	createBkp: function (e) {
		e.preventDefault();
		this.backupCreateRegion.show(new App.Views.BackupCreating({ model: this.model }));
		return false;
	}
});

App.Views.BackupItem = Marionette.ItemView.extend({
	template: ".jBackupsListTmpl",
	ui: {
		createDraftBtn: ".jCreateDraftFromVersBtn",
		deleteVersBtn: ".jDeleteVersBtn",
		loadBackup: ".jLoadBackup"
	},
	events: {
		"click @ui.createDraftBtn": "createDraft",
		"click @ui.deleteVersBtn": "deleteVers",
		"click @ui.loadBackup": "loadBackup"
	},
	createDraft: function () {
		var vers = {
			id: this.model.attributes.entityId,
			versionType: App.Constants.VersionType.draft,
			comment: "черновик из резервной копии от " + this.model.attributes.created
		};
		$.post("/api/entities/createbackup/", vers).done(function (id) {
			if (!id) {
				alert("Ошибка! Нельзя выполнить данное действие, так как черновик уже создан. Удалите/Опобликуйте активный черновик и повторите попытку.");
			} else {
				Backbone.history.navigate("/entities/" + id + "/", {
					trigger: true,
					replace: true
				});
			}
		});
	},
	deleteVers: function () {
		var that = this;
		if (confirm("Внимание! Вы собираетесь удалить резервную копию! Вы уверены?")) {
			$.post("/api/entities/delete/?id=" + this.model.entityId).done(function () {
				App.Collections.Backups.fetch({ data: { id: that.model.parentId } });
				that.destroy();
			});
		}

	},
	loadBackup: function (e) {
		e.preventDefault();
		Backbone.history.navigate("/entities/" + this.model.entityId + "/", {
			trigger: true,
			replace: true
		});
		App.modalRegion.empty();
		return false;
	}
});

App.Views.EntityBackupsView = Marionette.CollectionView.extend({
	childView: App.Views.BackupItem,
});

App.Views.BackupCreating = Marionette.ItemView.extend({
	template: ".jBackupCreateTmpl",
	ui: {
		comment: ".jCommentText",
		createBtn: ".jCreateBackup",
		cancelCreate: ".jCancelCreate"
	},
	events: {
		"click @ui.createBtn": "createBackup",
		"click @ui.cancelCreate": "cancelCreateBkp"
	},
	createBackup: function () {
		var that = this;
		this.model.comment = this.ui.comment.val();
		$.post("/api/entities/createbackup/", {
			id: this.model.originalInfo.id,
			versionType: App.Constants.VersionType.backup,
			comment: this.model.comment
		}).done(function () {
			alert("Резервная копия успешно создана");
			App.Collections.Backups.fetch({ data: { id: that.model.originalInfo.id } });
			that.destroy();
		});
	},
	cancelCreateBkp: function () {
		this.destroy();
	}

});
