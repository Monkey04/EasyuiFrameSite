# EasyuiFrameSite
####&nbsp;&nbsp;&nbsp;&nbsp;基于easyui搭建的后台框架，还有一些可复用的自定义组件

<br>
####主框架页面
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/frame.png" style="width:100%;height:100%"/>
</div>
<br>
初始化导航的方法 - 修改 js/jquery-easyui-1.4/jquery.easyui.menu.js 里的menuArray值
```java
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
```
该框架共有13款皮肤，修改皮肤的方法 - 修改js/jquery-easyui-1.4/jquery.easyui.theme.js 里的参数g_theme值
<br>该参数的有效值为：default、gray、metro、bootstrap、black、metro-blue、metro-gray、metro-green、metro-orange、metro-red、ui-cupertino、ui-pepper-grinder、ui-sunny
<br>

框架里的所有标签页只要引入了js/jquery-easyui-1.4/jquery.easyui.resize.js都会自适应
<br>

####列表模板页
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/datagrid.png" style="width:100%;height:100%"/>
</div>
<br>

该模板页以常用的easy-datagrid为例，初始化代码如下
```java
    <table id="EasyTable" class="easyui-datagrid" data-options="
    		border:0,
			title:'',
			url:'tempdata/admin-manage-data.js',
			method:'get',
			singleSelect:false,
			rownumbers:true,
			idField:'Id',
			fitColumns:false,
			pagination:true,
			pageSize:20,
			pageNumber:1,
			loadMsg:'加载中，请稍后... ...',
			columns:[[{
				field:'LoginName',title:'管理员账号',width:'200',align:'left'
			},{
				field:'Phone',title:'手机号码',width:'120',align:'left'
			},{
				field:'Email',title:'邮箱',width:'140',align:'left'
			},{
				field:'Enable',title:'是否启用',width:'70',align:'left',
				formatter:function(value,row,index){return BooleanFormat(value)}
			},{
				field:'LoginCount',title:'登录次数',width:'70',align:'left'			
			},{
				field:'CreateDate',title:'创建时间',width:'150',align:'left',
				formatter:function(value,row,index){ return TimeFormat(value) }
			},{
				field:'LastLogOffTime',title:'最后登录时间',width:'150',align:'left',
				formatter:function(value,row,index){ return TimeFormat(value) }
			}]],
			onLoadSuccess:DatagridOnLoadSuccess,
			toolbar:'#EasyToolBar',
			onDblClickRow:OnDblClickRow
		">
			
	</table>
```
在js/jquery.easyui.common.js中已封装了一些通用的列格式化方法和datagrid事件，部分如下
```java
//-----------------通用的datagrid方法 begin-------------------------------

function DatagridOnLoadSuccess(_data, _params) {
    $("#" + this.id).datagrid("unselectAll");
	if(_data.rows.length == 0) {
		$(this).parent().find(".datagrid-view2 .datagrid-body").html("<div style='padding:10px;text-align:center;color:gray'>没有数据</div>");
		_params && _params.emptyCallBack && _params.emptyCallBack(_data);
	} else {
		_params && _params.successCallBack && _params.successCallBack(_data);
	}

	_params && _params.callBack && _params.callBack(_data);
}

function DatagridSingleSelect(_datagridId, _callBack) {
    var selections = $("#" + _datagridId).datagrid("getSelections");
	if(selections.length == 1) {
		var idField = $("#" + _datagridId).datagrid("options").idField;
		_callBack && _callBack(selections[0][idField], selections[0]);
	} else {
		easymsg.alert("请选择一行数据");
	}
}

function DatagridSelectAllOrNot(_datagridId) {
    var isChecked = $("#" + _datagridId).parents(".panel.datagrid").find(".datagrid-toolbar input.select-all").is(":checked");
	$("#" + _datagridId).datagrid(isChecked ? "selectAll" : "unselectAll");
}

... ...
... ...

//-----------------end 通用的datagrid方法---------------------------------
```
<br>

####控件模板页
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/input-part1.png" style="width:100%;height:100%"/>
</div>
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/input-part2.png" style="width:100%;height:100%"/>
</div>
<br>
