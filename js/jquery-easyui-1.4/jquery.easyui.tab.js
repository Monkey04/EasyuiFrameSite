//--------------------------------------------------------------------------------
// 文件描述：后台Tab页右键菜单脚本 
// 文件作者： 
// 创建日期：2016-06-20 
// 修改记录： 
//--------------------------------------------------------------------------------
$(function() {
	var tabsId = 'ContentTab'; //tabs页签Id 
	var tabRightmenuId = 'ContentTabSubMenu'; //tabs右键菜单Id   
	//绑定tabs的右键菜单 
	$("#" + tabsId).tabs({
		onContextMenu: function(e, title) {
			//这时去掉 tabsId所在的div的这个属性：class="easyui-tabs"，否则会加载2次    
			e.preventDefault();
			$('#' + tabRightmenuId).menu('show', {
				left: e.pageX,
				top: e.pageY
			}).data("tabTitle", title);
		}
	});
	//实例化menu的onClick事件
	$("#" + tabRightmenuId).menu({
		onClick: function(item) {
			CloseTab(tabsId, tabRightmenuId, item.name);
		}
	});

});

//tab关闭事件  
//@param tabId  tab组件Id 
//@param tabMenuId tab组件右键菜单Id 
//@param type  tab组件右键菜单div中的name属性值 
function CloseTab(tabId, tabMenuId, type) {
	//tab组件对象 
	var tabs = $('#' + tabId); //tab组件右键菜单对象 
	var tabMenu = $('#' + tabMenuId);
	//获取当前tab的标题 
	var curTabTitle = tabMenu.data('tabTitle');
	//选中当前要操作的tab
	tabs.tabs('select', curTabTitle);

	//关闭当前tab 
	if (type === 'tab-close-self') {
		//通过标题关闭tab 
		tabs.tabs("close", curTabTitle);
	}
	//关闭全部tab 
	else {
		var closeTabsTitle;
		if (type === 'tab-close-all') {
			//获取所有关闭的tab对象 
			closeTabsTitle = getAllTabObj(tabs); //循环删除要关闭的tab  
			$.each(closeTabsTitle, function() {
				var title = this;
				tabs.tabs('close', title);
			});
		}
		//关闭其他tab 
		else if (type === 'tab-close-other') {
			//获取所有关闭的tab对象 
			closeTabsTitle = getAllTabObj(tabs); //循环删除要关闭的tab   
			$.each(closeTabsTitle, function() {
				var title = this;
				if (title != curTabTitle) {
					tabs.tabs('close', title);
				}
				tabs.tabs('select', curTabTitle);
			});
		}
		//关闭当前左侧tab 
		else if (type === 'tab-close-left') {
			//获取所有关闭的tab对象 
			closeTabsTitle = getLeftToCurrTabObj(tabs, curTabTitle); //循环删除要关闭的tab  
			$.each(closeTabsTitle, function() {
				var title = this;
				tabs.tabs('close', title);
			});
			tabs.tabs('select', curTabTitle);

		}
		//关闭当前右侧tab 
		else if (type === 'tab-close-right') {
			//获取所有关闭的tab对象 
			closeTabsTitle = getRightToCurrTabObj(tabs, curTabTitle); //循环删除要关闭的tab 
			$.each(closeTabsTitle, function() {
				var title = this;
				tabs.tabs('close', title);
			});
			tabs.tabs('select', curTabTitle);
		}
		//刷新当前tab
		else if (type === 'tab-refresh') {
			var oldContent = $("#ContentTab").tabs("getSelected").panel("options").content || $("#ContentTab").tabs("getSelected").html();
			var newContent = oldContent.replace(new RegExp(/t=[\w]+/), "t=" + new Date().getTime());
			tabs.tabs("update", {
				tab: tabs.tabs("getSelected"),
				options: {
					content: newContent
				}
			})
		}
	}
}

//获取所有关闭的tab对象  
//@param tabs tab组件  
function getAllTabObj(tabs) {
	//存放所有tab标题  
	var closeTabsTitle = [];
	//所有所有tab对象  
	var allTabs = tabs.tabs('tabs');
	$.each(allTabs, function() {
		var tab = this;
		var opt = tab.panel('options');
		//获取标题   
		var title = opt.title;
		//是否可关闭 ture:会显示一个关闭按钮，点击该按钮将关闭选项卡 
		var closable = opt.closable;
		if (closable) {
			closeTabsTitle.push(title);
		}
	});
	return closeTabsTitle;
}

//获取左侧第一个到当前的tab  
//@param tabs  tab组件 
//@param 
//curTabTitle 到当前的tab 
function getLeftToCurrTabObj(tabs, curTabTitle) {
	//存放所有tab标题  
	var closeTabsTitle = [];
	//所有所有tab对象  
	var allTabs = tabs.tabs('tabs');
	for (var i = 0; i < allTabs.length; i++) {
		var tab = allTabs[i];
		var opt = tab.panel('options');
		//获取标题 
		var title = opt.title;
		//是否可关闭 ture:会显示一个关闭按钮，点击该按钮将关闭选项卡   
		var closable = opt.closable;
		if (closable) {
			//alert('title' + title + '  curTabTitle:' + curTabTitle);  
			if (title == curTabTitle) {
				return closeTabsTitle;
			}
			closeTabsTitle.push(title);
		}
	}
	return closeTabsTitle;
}

//获取当前到右侧最后一个的tab  
//@param tabs          tab组件 
//@param curTabTitle 到当前的tab 
function getRightToCurrTabObj(tabs, curTabTitle) {
	//存放所有tab标题  
	var closeTabsTitle = [];
	//所有所有tab对象  
	var allTabs = tabs.tabs('tabs');
	for (var i = (allTabs.length - 1); i >= 0; i--) {
		var tab = allTabs[i];
		var opt = tab.panel('options'); //获取标题  
		var title = opt.title; //是否可关闭 ture:会显示一个关闭按钮，点击该按钮将关闭选项卡  
		var closable = opt.closable;
		if (closable) {
			//alert('title' + title + '  curTabTitle:' + curTabTitle);  
			if (title == curTabTitle) {
				return closeTabsTitle;
			}
			closeTabsTitle.push(title);
		}
	}
	return closeTabsTitle;
}