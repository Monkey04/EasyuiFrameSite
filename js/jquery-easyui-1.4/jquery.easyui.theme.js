/*
 * easyui主题相关
 */
var g_theme = "default";

$(function() {
	var themes = [{
		value: 'default',
		text: 'Default',
		group: 'Base'
	}, {
		value: 'gray',
		text: 'Gray',
		group: 'Base'
	}, {
		value: 'metro',
		text: 'Metro',
		group: 'Base'
	}, {
		value: 'bootstrap',
		text: 'Bootstrap',
		group: 'Base'
	}, {
		value: 'black',
		text: 'Black',
		group: 'Base'
	}, {
		value: 'metro-blue',
		text: 'Metro Blue',
		group: 'Metro'
	}, {
		value: 'metro-gray',
		text: 'Metro Gray',
		group: 'Metro'
	}, {
		value: 'metro-green',
		text: 'Metro Green',
		group: 'Metro'
	}, {
		value: 'metro-orange',
		text: 'Metro Orange',
		group: 'Metro'
	}, {
		value: 'metro-red',
		text: 'Metro Red',
		group: 'Metro'
	}, {
		value: 'ui-cupertino',
		text: 'Cupertino',
		group: 'UI'
	}, {
		value: 'ui-pepper-grinder',
		text: 'Pepper Grinder',
		group: 'UI'
	}, {
		value: 'ui-sunny',
		text: 'Sunny',
		group: 'UI'
	}];

	$("#CbbTheme").combobox({
		groupField: 'group',
		data: themes,
		editable: false,
		panelHeight: 'auto',
		onChange: onChangeTheme,
		onLoadSuccess: function() {
			$(this).combobox('setValue', g_theme);
		}
	});

	//初始化主题css
	ChangeThemeCss(g_theme);
});

function onChangeTheme(theme) {
	if (g_theme != theme) {
		easymsg.confirm("确定要使用" + theme + "主题吗？", function() {
			g_theme = theme;
			$("#CbbTheme").combobox('setValue', g_theme);
			ChangeThemeCss(g_theme);
			if(window.parent.location.href.indexOf("default-frame")>-1){
				window.parent.ChangeThemeCss(g_theme);
			}
		}, function() {
			$("#CbbTheme").combobox('setValue', g_theme);
		});
	}
}

//修改主题
function ChangeThemeCss(themeName) {
	var $themeLink = $("[href*='easyui.css']");
	if ($themeLink && themeName) {
		var href = $themeLink.attr("href");
		if (href) {
			var m = href.match(/themes\/([\w|\w\+\-\w]+)\/easyui.css/);
			if (m) {
				$themeLink.attr("href", href.replace(m[1], themeName));
				var headerBg = $(".default-frame-header").css("background");
				if(headerBg){
					$(".default-frame-header").css("background", headerBg.replace(m[1], themeName));
				}
			}
		}
	}
}