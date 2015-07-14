(function () {
	var tmplContext = ".jControlTmpls";

	var Photo = Marionette.ItemView.extend({
		template: tmplContext + " .jPhotoGalleryItemTmpl",
		templateHelpers: function () {
			var that = this;
			return {
				isDeleted: function () {
					return that.options.isDeleted;
				},
				isSelected: function () {
					return that.options.isSelected;
				},
				hasFile: function () {
					return that.options.isSelected || (that.model.id !== Utils.uuid4.empty() && !that.options.isDeleted);
				},
				getRootUrl: function () {
					return that.options.rootUrl;
				}
			}
		},
		ui: {
			desc: "[name=desc]",
			"delete": "[name=delete]",
			cancelDelete: "[name=cancelDelete]",
			cancelSelected: "[name=cancelSelected]"
		},
		events: {
			"click @ui.cancelSelected": function () {
				//this.ui.photo.val("");
				//this.options.isSelected = false;
				//this.options.selectedFile = null;
				this.model.collection.remove(this.model);
				//return false;
			},
			"click @ui.delete": function () {
				this.options.isDeleted = true;
				this.render();
				this.triggerMethod("view:change");
				App.needConfirmToLeave = true;
				return false;
			},
			"click @ui.cancelDelete": function () {
				//this.ui.photo.val("");
				this.options.isSelected = false;
				this.options.selectedFile = null;
				this.options.isDeleted = false;
				this.render();
				this.triggerMethod("view:change");
				return false;
			},
		},
		initialize: function () {
			_.extend(this.options, {
				isDeleted: false,
				isSelected: false,
				isFileLoaded: false
			});
			//_.extend(this.model, { isDisabled: this.options.isDisabled });
		},
		onRender: function () {

			var that = this;
			var file = that.model.selectedFile;

			if (file && !this.options.isFileLoaded) {
				var reader = new FileReader();
				reader.onload = function (e) {
					that.options.isFileLoaded = true;
					that.options.isSelected = true;
					that.model.selectedFileUrl = e.target.result;
					//that.model.id = Utils.uuid4.empty();
					that.render();
					that.triggerMethod("view:change");
				};

				reader.readAsDataURL(file);
			}

			//console.log(this.model);

		},
		getData: function () {

			if (this.options.isSelected) {
				//this.model.id = Utils.uuid4.new();
				//data.name = this.options.selectedFile.name;
			} else if (this.options.isDeleted) {
				this.model.id = Utils.uuid4.empty();
			}
			this.model.description = this.ui.desc.val();

			return {
				description: this.model.description,
				id: this.model.id,
				name: this.model.name,
				num: this.model.num
			};
		},
		getFile: function () {
			if (this.model.selectedFile) {
				return {
					id: this.model.id,
					file: this.model.selectedFile
				};
			}
		}

	});

	var Photos = Marionette.CollectionView.extend({
		childView: Photo,
		//behaviors: {
		//	Sortable: {
		//		containment: 'parent',
		//		handle: ".jHandle"
		//	}
		//},
		childViewOptions: function () {
			return this.options;
		},
		childEvents: {
			"view:change": function () {
				this._sortable();
			}
		},
		onRender: function () {
			this._sortable();
		},
		_sortable: function () {
			var collection = this.collection // Замыкаем коллекцию
            , items = this.children._views // Получаем список дочерних элементов
            , view
			;

			for (var v in items) {
				view = items[v];
				view.$el.attr('data-backbone-cid', view.model.cid); // Привязываем элемент к модели по cid
			}
			this.$el.sortable("destroy");

			this.$el.sortable({ // Делаем список сортируемым
				containment: "parent",
				forcePlaceholderSize: true,
				cursor: "move",
				handle: ".jHandle",
			}).bind('sortupdate', function (event, ui) {
				var model = collection.get(ui.item.data('backbone-cid'));
				// Получаем привязанную модель
				collection.remove(model, { silent: true });
				// По-тихому удаляем её из коллекции
				collection.add(model, { at: ui.item.index(), silent: true });
				//И также втихаря добавляем её по нужному индексу

				for (var i = 0; i < collection.length; i++) {
					collection.models[i].num = i;
				}
			});
		}
	});

	App.Views.Controls.PhotoGallery = Marionette.LayoutView.extend({
		getTemplate: function () {
			return MenuControlGetTemplate(this, true);
		},
		regions: {
			photosList: ".jPhotosList"
		},
		ui: {
			photoFile: ".jPhotoFileDialog",
			sortableList: ".jPhotoSortable"
		},
		events: {
			"change @ui.photoFile": "addFiles",
		},
		initialize: function () {
			_.extend(this.options,
				{
					collection: new Backbone.Collection()
				});
		},

		addFiles: function () {
			var that = this;
			var fileList = this.ui.photoFile[0].files;

			$.each(fileList, function (i, item) {
				var object = {
					id: Utils.uuid4.new(),
					name: item.name,
					description: "",
					rootUrl: that.model.rootUrl,
					selectedFileUrl: "",
					selectedFile: item
				};

				var m = new Backbone.ExtModel(object);

				that.options.collection.add(m);
			});

			this.ui.photoFile.val("");
			App.needConfirmToLeave = true;
		},

		onRender: function () {
			if (!this.options.isMenu) {
				var that = this;
				if (this.model.data) {
					$.each(this.model.data.$values, function (i, item) {

						that.options.collection.add(new Backbone.ExtModel(_.extend(item, { isDisabled: that.model.isDisabled })));
					});

					this.options.collection.reset(this.options.collection.sortBy("num"));
				}

				//console.log(this.model);
				this.photosList.show(new Photos({
					collection: this.options.collection,
					rootUrl: this.model.rootUrl,
					isDisabled: this.model.isDisabled
				}));
			}

		},
		getData: function () {
			var data = [];
			var views = this.photosList.currentView.children.toArray();
			for (var i = 0; i < views.length; i++) {
				var model = views[i].getData();
				if (model.id !== Utils.uuid4.empty()) {
					data.push(model);
				}
			}

			return data;
		},
		getFile: function () {
			var files = [];

			var views = this.photosList.currentView.children.toArray();
			for (var i = 0; i < views.length; i++) {
				var file = views[i].getFile();
				if (file) {
					files.push(file);
				}
			}

			return files;
		}
	});

})();

