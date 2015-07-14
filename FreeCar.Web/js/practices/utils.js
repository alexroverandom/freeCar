(function () {
	"use strict";
	window.Utils = {};

	Utils.uuid4 = {};
	Utils.uuid4.new = function () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0,
				v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};

	Utils.uuid4.empty = function () {
		return '00000000-0000-0000-0000-000000000000';
	};
})();