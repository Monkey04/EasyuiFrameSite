/*
 * 通用的一些js方法
 */

//打开新的窗口并居中
function OpenCenterWin(winName, _url, _width, _height) {
	var winWidth = 600;
	var winHeight = 480;
	if (arguments.length == 4) {
		winWidth = arguments[2];
		winHeight = arguments[3];
	}
	var winLeft = (screen.availWidth - winWidth) / 2;
	var winTop = (screen.availHeight - winHeight) / 2;
	var winParams = "scrollbars=0,status=0,menubar=0,resizable=2,location=0,top=" + winTop + ",left=" + winLeft + ",width=" + winWidth + ",height=" + winHeight;
	var winObj = window.open(_url, winName, winParams);
	winObj.focus();
	return winObj;
}

//判断某个元素是否绑定了某个方法
function IsBindFn(_obj, _fn) {
	var isBind = false;
	var objEvent = $._data(_obj instanceof jQuery ? _obj[0] : $(_obj)[0], "events");
	if (objEvent && typeof(_fn) === "function") {
		for (var n in objEvent) {
			if (objEvent.hasOwnProperty(n)) {
				for (var i = 0; i < objEvent[n].length; i++) {
					isBind = isBind || (objEvent[n][i].handler == _fn);
				}
			}
		}
	};
	return isBind;
}

//获取所有get参数，返回数组，使用方法例如Request["name"]
var Request = (function() {
	var result = [];
	if (location.href.indexOf("?") == -1 || location.href.indexOf(name + '=') == -1) {
		return '';
	}
	var queryString = location.href.substring(location.href.indexOf("?") + 1);
	var parameters = queryString.split("&");
	var pos, paraName, paraValue;
	for (var i = 0; i < parameters.length; i++) {
		pos = parameters[i].indexOf('=');
		if (pos == -1) {
			continue;
		}
		paraName = parameters[i].substring(0, pos);
		paraValue = parameters[i].substring(pos + 1);
		result[paraName] = decodeURIComponent(paraValue.replace(/\+/g, " "));
	}
	return result;
})();