/*
 * 后台管理框架页的菜单相关
 */
(function($) {
	
	var menuArray = [{
		"Icon": "icon-custom-home",
		"Name": "内容",
		"SecondMenus": [{
			"Icon": "icon-custom-home",
			"Name": "内容管理",
			"Menus": [{
				"Icon": "icon-custom-default",
				"Name": "列表模板页",
				"Url": "list-template.html",
				"Description": "列表模板页"
			},{
				"Icon": "icon-custom-default",
				"Name": "控件模板页",
				"Url": "input-template.html",
				"Description": "控件模板页"
			},{
				"Icon": "icon-custom-detail",
				"Name": "分类模板页",
				"Url": "classification-template.html",
				"Description": "分类模板页"
			}]
		},{
			"Icon": "icon-custom-content",
			"Name": "资讯管理",
			"Menus":[{
				"Icon": "icon-custom-content",
				"Name": "资讯管理",
				"Url": "none.html",
				"Description": "资讯管理"
			}]
		}]
	},{
		"Icon": "icon-custom-config",
		"Name": "设置",
		"SecondMenus":[{
			"Icon": "icon-custom-config",
			"Name":"系统设置",
			"Menus":[{
				"Icon": "icon-custom-config",
				"Name": "基本设置",
				"Url": "none.html",
				"Description": "基本设置"
			}]
		}]
	}];

	var $mainMenu = $("#MainMenu");
	var $secondMenu = $("#SecondMenu");

	//清除二级导航菜单
	function CleanSecondMenu() {
		while ($secondMenu.accordion("panels").length > 0) {
			$secondMenu.accordion("remove", 0);
		}
	}

	//根据一级导航菜单Name值获取对应的对象
	function GetMenuObjByName(name) {
		for (var i = 0; i < menuArray.length; i++) {
			if (menuArray[i].Name == name) {
				return menuArray[i];
			}
		}
	}

	//添加二级菜单
	function AddSecondMenu(name) {
		var menuObj = GetMenuObjByName(name);
		if (menuObj && menuObj.SecondMenus) {
			$.each(menuObj.SecondMenus, function(i, secondMenuObj) {
				var secondMenuHtml = "";
				$.each(secondMenuObj.Menus, function(j, thirdMenuObj) {
					secondMenuHtml += "<a href=\"javascript:AddContentTab('" + thirdMenuObj.Name + "','" + thirdMenuObj.Url + "')\" title=\"" + thirdMenuObj.Description + "\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'" + thirdMenuObj.Icon + "'\" style=\"width: 90%;margin-left:10px; text-align: left\">" + thirdMenuObj.Name + "</a>";
				});
				$secondMenu.accordion("add", {
					title: secondMenuObj.Name,
					content: secondMenuHtml,
					iconCls: secondMenuObj.Icon
				})
			});

			$secondMenu.accordion("select", 0);
		}
	}

	//新增或更新tab
	function AddTab(title, url) {
		var $contentTab = $("#ContentTab");
		//为tab地址添加时间戳，避免缓存
		url = url.indexOf("?") > 0 ? url + "&t=" + new Date().getTime() : url + "?t=" + new Date().getTime();
		//tab内容
		var iframeHtml = "<iframe scrolling=\"auto\" frameborder=\"0\"  src=\"" + url + "\" style=\"width:100%;height:100%;\"></iframe>";

		if ($contentTab.tabs("exists", title)) {
			//当前选中的tab的title
			var selectedTitle = $contentTab.tabs("getSelected").panel("options").title;
			//选中要更新的tab
			$contentTab.tabs("select", title);
			var $nowTab = $contentTab.tabs("getSelected");
			//如果先前选中和当前选中的tab不同，则执行更新
			if (selectedTitle != $nowTab.panel("options").title) {
				$contentTab.tabs("update", {
					tab: $nowTab,
					options: {
						content: iframeHtml
					}
				})
			}
		} else {
			$contentTab.tabs("add", {
				title: title,
				closable: true,
				content: iframeHtml
			})
		}
	}

	//初始化菜单
	function InitMenu() {
		//清除一级菜单
		$mainMenu.html("");

		//添加一级菜单
		var mainMenuHtml = "";
		$.each(menuArray, function(index, obj) {
			mainMenuHtml += "<a title=\"" + obj.Name + "\" href=\"javascript:void(0)\" class=\"easyui-linkbutton\" data-options=\"plain:true,iconCls:'" + obj.Icon + "'\">" + obj.Name + "</a>";
		});
		$mainMenu.html(mainMenuHtml);
		$mainMenu.children("a").linkbutton();

		//绑定一级菜单
		$mainMenu.on("click", "a", function() {
			var menuName = $(this).attr("title");
			if (!$(this).hasClass("active")) {
				CleanSecondMenu();
				AddSecondMenu(menuName);
				$mainMenu.children("a.active").removeClass("active");
				$(this).addClass("active");
			}
		})

		//触发第一个一级菜单点击事件
		$mainMenu.children("a").eq(0).trigger("click");

		//绑定二级导航菜单
		$secondMenu.accordion({
			animate: true
		})

	}

	$(function() {
		InitMenu();
	})

	window.AddContentTab = AddTab;

})(jQuery)

//关闭当前tab
function CloseNowTab() {
	var tab = $('#ContentTab').tabs('getSelected');
	if (tab) {
		var index = $('#ContentTab').tabs('getTabIndex', tab);
		$('#ContentTab').tabs('close', index);
	}
}