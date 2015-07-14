(function($, _) {
	"use strict";

	$.ajaxPrefilter(function(options, originalOptions, jqXHR) {
		var originalType = originalOptions.type.toLowerCase(),
			type = options.type.toLowerCase(),
			isGet = originalType === "get" || type === "get",
			isHead = originalType === "head" || type === "head";


		if (!isGet && !isHead) {
			// не делать, если FormData, т.е. есть файлы.

			if (!(options.data instanceof FormData || _.isString(options.data))) {
				// для того, чтобы при вызове $.post не писать JSON.stringify
				options.data = JSON.stringify(originalOptions.data);
			}

			if ($.connection && $.connection.hub) {
				jqXHR.setRequestHeader("SignalRConnectionId", $.connection.hub.id);
			}
		}
	});

	$.postDirect = function(url, data) {
		return $.ajax({
			type: "POST",
			url: url,
			data: data,
			processData: false,
		});
	};

	$.postJson = function(url, data) {
		return $.ajax({
			type: "POST",
			url: url,
			data: data,
			contentType: 'application/json',
			processData: false
		});
	};

}($, _));