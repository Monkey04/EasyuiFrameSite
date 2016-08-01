/*
 * 基于easyui的弹出框组件
 * editor: monkey
 * time: 2016.07.04
 */
var easymsg = window.easymsg || {};
easymsg = {
	confirm: function(message, fnOk, fnCancel) {
		top.$.messager.confirm("提示信息", message, function(ok) {
			if (ok) {
				if (fnOk) {
					fnOk();
				}
			} else {
				if (fnCancel) {
					fnCancel();
				}
			}
		});
	},
	frameDialog: function(options) {
		var config = {
			id: 'dialog-' + Math.random(),
			title: 'dialog',
			width: 500,
			height: 200,
			url: '',
			closed: false,
			cache: false,
			modal: true,
			onClose: function() {
				$(this).dialog('destroy');
			}
		};
		$.extend(config, options);
		var container = $('<div id="' + config.id + '"><iframe allowtransparency="true" frameborder="0" style="width:100%;height:100%;" scrolling="no"></iframe></div>').appendTo('body');
		container.find('iframe').attr('src', config.url);
		container.dialog(config);
		return container;
	},
	alert: function(message) {
		top.$.messager.alert("提示信息", message, "info");
	},
	alertSucessMsg: function(message) {
		top.$.messager.alert("成功提示信息", message, 'info');
	},
	alertErrorMsg: function(message) {
		top.$.messager.alert("错误提示信息", message, 'error');
	},
	loading: function(message) {
		message = message || "加载中，请稍后... ...";
		$("<div class=\"datagrid-mask\"></div>").css({
			display: "block",
			width: "100%",
			height: "100%",
			"position":"fixed",
			"z-index":"1000"
		}).appendTo("body");
		$("<div class=\"datagrid-mask-msg\"></div>").html(message).appendTo("body").css({
			display: "block",
			left: "50%",
			top: "50%",
			"z-index":"1001"
		});
		var h=$(".datagrid-mask-msg").outerHeight();
		var w=$(".datagrid-mask-msg").outerWidth();
		$(".datagrid-mask-msg").css({
			"margin-top":(-h/2)-15+"px",
			"margin-left":(-w/2)+"px",
		})
	},
	removeLoading: function() {
		$(".datagrid-mask").remove();
		$(".datagrid-mask-msg").remove();
	}
}