# EasyuiFrameSite
####&nbsp;&nbsp;&nbsp;&nbsp;基于easyui搭建的后台框架，还有一些可复用的自定义组件

<br>
####主框架页面
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/frame.png" style="width:100%;height:100%"/>
</div>
<br>
```sh
 初始化导航的方法 - 修改 js/jquery-easyui-1.4/jquery.easyui.menu.js 里的menuArray值
```
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
```sh
该框架共有13款皮肤，修改皮肤的方法 - 修改js/jquery-easyui-1.4/jquery.easyui.theme.js 里的参数g_theme值
该参数的有效值为：default、gray、metro、bootstrap、black、metro-blue、metro-gray、metro-green、metro-orange、metro-red、ui-cupertino、ui-pepper-grinder、ui-sunny
```
```sh
框架里的所有标签页只要引入了js/jquery-easyui-1.4/jquery.easyui.resize.js都会自适应
```
<br>

####列表模板页
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/datagrid.png" style="width:100%;height:100%"/>
</div>
<br>

```sh
该模板页以常用的easy-datagrid为例，初始化代码如下
```
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
```sh
在js/jquery.easyui.common.js中已封装了一些通用的列格式化方法和datagrid事件，部分如下
```
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

该控件模板页包含了大部分常用的easyui表单控件和自定义的上传控件、地区控件、富文本编辑器，上传控件和富文本编辑器都是基于<a href="http://kindeditor.net/demo.php" target="_blank">KindEditor</a>
<br>
 - textbox
 - multiline-textbox
 - combobox
 - single-image (自定义单图上传控件)
 - datebox
 - datetimebox
 - richtext (自定义富文本编辑器)
 - numberspinner
 - multi-images (自定义多图上传控件)
 - combogrid
 - area (自定义地区控件)
 - fileupload (自定义文件上传控件)
<br>

######single-image (自定义单图上传控件)
```sh
 single-image (自定义单图上传控件)
 初始化方法：var singleImage=InitSingleImageUpload("UploadLogo","img/1.jpg");
 可用方法：singleImage.getValue() --获取图片地址
```
```java
 <!--single-image的html-->
 <tr>
	<td class="panel-header td-left">
		single-image：
	</td>
	<td class="panel-header td-right">
	    <input type="text" class="easyui-textbox" style="width: 250px;"/>
		<a id="UploadLogo" class="easyui-linkbutton" data-options="iconCls:'icon-custom-picture_add'">上传图片</a>
	</td>
 </tr>
```
```java
//初始化单图上传控件
function InitSingleImageUpload(_id, _value) {
    var obj={};
    KindEditor.ready(function(k) {
		var editor = k.editor({
			uploadJson: "",
			fileManagerJson: "tempdata/file-manager-json.js",
			allowFileManager: true
		});

		var $img = $("#" + _id).siblings("img");
		if($img.length == 0) {
			$img = $("<img style='width: 220px;'/><br>").insertBefore($("#" + _id).parent().children(":first"));
		}

		//初始化值
		var defaultValue = _value ? _value : "img/nopic.jpg";
		$img.attr("src", defaultValue);
		var $textbox = $img.parent().find(".easyui-textbox");
		$textbox.textbox("setValue", defaultValue);

		k("#" + _id).bind("click", function() {
			editor.loadPlugin("image", function() {
				editor.plugin.imageDialog({
					imageUrl: k("#url").val(),
					clickFn: function(url, title, width, height, border, align) {
						$img.attr("src", url);
						$img.parent().find(".easyui-textbox").textbox("setValue", url);
						editor.hideDialog();
					}
				})
			})
		});

		//手动修改图片路径，重新赋值给预览图
		$textbox.textbox("options").onChange = function() {
			$img.attr("src", $textbox.textbox("getValue"))
		}	
		
		obj.getValue=function(){
			return $textbox.textbox("getValue");
		}	
		
	});
	
	return obj;
}
```
* * *
######richtext (自定义富文本编辑器)
```sh
 richtext (自定义富文本编辑器)
 初始化方法：var richText=InitRichTextEditor("Desc","<b>html</b>");
 可用方法：richText.getEditor() --获取KindEditor对象
           richText.isEmpty() --判断当前编辑器内容是否为空
           richText.getText() --获取当前编辑器过滤掉html标签后的文本值
           richText.getHtml() --获取当前编辑器包含html标签的文本值
```
```java
<!--richtext的html-->
<tr>
    <td class="panel-header td-left">
	    richtext：
	</td>
    <td class="panel-header td-right">
		<textarea id="Desc" style="width: 550px;height: 350px;"></textarea>
	</td>
</tr>
```
```java
//初始化富文本编辑器
function InitRichTextEditor(_id, _value) {
    var obj={};
	KindEditor.ready(function(k) {
		var editor = k.create("#" + _id, {
			//hiddenName:_id,
			uploadJson: "",
			fileManagerJson: "../tempdata/file-manager-json.js",
			allowFileManager: true,
			fileUploadLimit: 30,
			items: ["source", "fontname", "fontsize", "|", "forecolor", "hilitecolor", "bold", "italic", "underline", "removeformat", "|", "justifyleft", "justifycenter", "justifyright", "insertorderedlist", "insertunorderedlist", "|", "emoticons", "image", "link"],
			afterChange: function() {
				$("#" + _id).val(this.html());
			}
		});

		//初始化值
		editor.html(_value);
		
		obj.getEditor=function(){
			return editor;
		};
		obj.isEmpty=function(){
			return this.getEditor().isEmpty();
		};
		obj.getText=function(){
			return this.getEditor().text();
		};
		obj.getHtml=function(){
			return this.getEditor().html();
		}
		
	});
	
	return obj;
}
```
* * *
######multi-images (自定义多图上传控件)
```sh
 multi-images (自定义多图上传控件)
 初始化方法：var multiImages=InitMultiImagesUpload("Imgs",[
                             {"img":"img/1.jpg","title":"1.jpg"}
                          ],false);
 可用方法：multiImages.getData() --获取数组形式的图片数据，[{"img":"img/1.jpg","title":"1.jpg"}]
           multiImages.isEmpty() --判断当前多图控件内容是否为空
           multiImages.getNum() --获取当前多图控件的图片数
```
```java
<!--multi-images的html-->
<tr>
	<td class="panel-header td-left">
		multi-images：
	</td>
	<td class="panel-header td-right">
		<div id="Imgs"></div>
	</td>
</tr>
```
```java
//初始化多图上传控件
function InitMultiImagesUpload(_id, _dataArray, _isCollapsed) {
    var $container = $("#" + _id);

	var panelDiv = document.createElement("div");
	var toolDiv = document.createElement("div");
	var addBtn = document.createElement("a");
	var emptyBtn = document.createElement("a");
	var contentDiv = document.createElement("div");
	var imgUl = document.createElement("ul");

	if(!(_dataArray instanceof Array)) {
		_dataArray = [];
	}

	//初始化视图
	InitHtml();
	//初始化事件
	InitEvent();
	//设置头部图片数
	SetImgNum();

	function InitHtml() {
		//添加panel容器并初始化
		panelDiv.className = "easyui-panel multi-image-wrapper";
		panelDiv.style.position = "relative";
		$container.append(panelDiv)
		$(panelDiv).panel({
			width: 550,
			height: 350,
			title: "图片数（0）",
			collapsible: true,
			iconCls: "icon-custom-pictures",
			collapsed: _isCollapsed == true
		})

		//添加工具栏
		toolDiv.className = "datagrid-toolbar";
		$(toolDiv).attr("style", "padding: 3px 10px");
		$(panelDiv).append(toolDiv);

		//加入添加按钮
		$(toolDiv).append(addBtn);
		$(addBtn).linkbutton({
			plain: true,
			iconCls: "icon-save",
			text: "添加"
		})

		//加入清空按钮
		$(toolDiv).append(emptyBtn);
		$(emptyBtn).linkbutton({
			plain: true,
			iconCls: "icon-remove",
			text: "清空"
		})

		//添加可滚动的内容
		$(contentDiv).attr("style", "width: 100%;position: absolute;top: 33px;bottom: 0;overflow: auto;");
		$(contentDiv).append(imgUl);
		$(panelDiv).append(contentDiv);

		//根据数据初始化内容视图
		$.each(_dataArray, function(index, obj) {
			AddImgLi(obj.img, obj.title);
		})

	}

	function InitEvent() {
		//绑定添加事件
		KindEditor.ready(function(k) {
			var kEditor = k.editor({
				uploadJson: "",
				fileManagerJson: "tempdata/file-manager-json.js",
				allowFileManager: true
			});

			$(addBtn).bind("click", function() {
				kEditor.loadPlugin("multiimage", function() {
					kEditor.plugin.multiImageDialog({
						clickFn: function(urlList) {
							AddImgLi("img/3.jpg", "测试");
							$.each(urlList, function(index, url) {
								AddImgLi(url);
							});

							kEditor.hideDialog();
							SetImgNum();
						}
					})
				})
			});

		})

		//绑定清空事件
		$(emptyBtn).bind("click", function() {
			$(imgUl).html("");
			SetImgNum();
		});

		//绑定内容单项删除事件
		$(imgUl).on("click", ".easyui-linkbutton", function() {
			$(this).parents("li").remove();
			SetImgNum();
		});

		//绑定内容列表拖动排序事件
		$(imgUl).sortable();
		$(imgUl).disableSelection();
	}

	function AddImgLi(_url, _title) {
		var li = document.createElement("li");
		li.style = "display: block;float: left;margin-left: 15px;margin-top: 5px;text-align: center;";
		li.innerHTML += "<img src=\"" + _url + "\" style=\"width: 86px;height: 86px;\" title=\"" + (_title == undefined ? "" : _title) + "\"/>";
		li.innerHTML += "<br/>";
		li.innerHTML += "<input class=\"easyui-textbox\" style=\"width: 84px;\"/>";
		li.innerHTML += "<br/>";
		li.innerHTML += "<a class=\"easyui-linkbutton\">删除</a>";
		$(imgUl).append(li);

		$(li).find(".easyui-textbox").textbox({
			value: _title,
			prompt: "请输入提示",
			onChange: function(newValue, oldValue) {
				$(this).parents("li").find("img").attr("title", newValue);
			}
		});
		$(li).find(".easyui-linkbutton").linkbutton({
			plain: true,
			iconCls: "icon-remove"
		});
	}

	function SetImgNum() {
		$(panelDiv).panel("setTitle", "图片数（" + $(imgUl).find("img").length + "）");
	}

	function GetData() {
		var data = [];
		$.each($(imgUl).find("img"), function(index, imgObj) {
			data.push({
				"img": $(imgObj).attr("src"),
				"title": $(imgObj).attr("title")
			})
		})

		return data;
	}

	function GetNum() {
		return GetData().length;
	}

	function IsEmpty() {
		return GetData().length == 0;
	}

	return {
		getData:GetData,
		isEmpty:IsEmpty,
		getNum:GetNum
	};
}
```
* * *
######area (自定义地区控件)
```sh
 area (自定义地区控件) --依赖于js/area.data-2.0.js和js/area.js
 初始化方法：var areaInput=InitAreaInput("Area","广东省-肇庆市-端州区");
             var areaInput=InitAreaInput("Area","440000-441200-441202");
 可用方法：areaInput.getText() --获取地区文本值，如广东省-肇庆市-端州区
           areaInput.getValue() --获取地区code值，如440000-441200-441202
           areaInput.isRemote() --判断当前选中地区是否包含偏远地区，可作计算邮费之用
           areaInput.isCompleteSelect() --判断当前选中地区是否选择完整，如“广东省-肇庆市”则是不完整
```
```java
<!--area的html-->
<tr>
    <td class="panel-header td-left">
		area：
	</td>
    <td class="panel-header td-right">
		<div id="Area"></div>
	</td>
</tr>
```
```java
//初始化地区级联控件
function InitAreaInput(_id, _value) {
    if (!(window.g_areas instanceof Array)) {
		return;
	}

	var $container = $("#" + _id);
	var maxLevel = 1;

	Init();

	function Init() {
		$container.html("");
		if (typeof(_value) == "undefined") {
			//没传入初始值，初始化首个下拉
			GenerateInput("0", 1);
		} else {
			//判断传入的参数是text还是value
			var isText = isNaN(_value.replace(/\-/g, ""));
			var areaArry = _value.split("-");
			var levelTag = 0;
			var parentCode = 0;

			$.each(areaArry, function(index, item) {
				var itemObj = isText ? GetItemObjByTextAndParentCode(item, parentCode) : GetItemObjByValue(item);
				parentCode = itemObj["parentCode"];
				var code = itemObj["code"];

				var $input = GenerateInput(parentCode, ++levelTag);
				$input.find("option[value=" + code + "]").attr("selected", true);

				//因为文本值会有相同，例如市辖区，所以要根据parentCode和文本值找对应的对象
				parentCode = code;

				//生成所有下拉控件后，触发最后一个有效下拉控件的change事件
				//因为可能的选项为“北京市-市辖区-请选择区/县/街道”之类
				if (areaArry.length == levelTag) {
					$container.find("select:last").trigger("change");
				}
			});

		}
	}

	function GenerateInput(_parentCode, _level) {
		var $input = $container.find("select[level=" + _level + "]");
		var isExist = true;
		var isHaveOptions = false;

		maxLevel = _level > maxLevel ? _level : maxLevel;
		if ($input.length == 0) {
			isExist = false;
			$input = $("<select>");
			$input.attr("level", _level);
			$input.css("margin-left", "5px");
		}

		var html = GenerateOption("-1", _level, DefaultValueByLevel(_level), false);
		$.each(g_areas, function(index, item) {
			if (item["parentCode"] == _parentCode) {
				isHaveOptions = true;
				html += GenerateOption(item["code"], item["level"], item["name"], item["IsRemote"]);
			}
		})

		$input.html(html);

		//非更新并且有值，插入新的select控件并绑定事件
		if (!isExist && isHaveOptions) {
			$container.append($input);
			$input.bind("change", OnSelectChange);
		}

		return $input;
	}

	function GenerateOption(_code, _level, _name, _isRemote) {
		return "<option value='" + _code + "' level='" + _level + "' remote='" + (_isRemote == true ? "true" : "false") + "'>" + _name + "</option>";
	}

	function OnSelectChange() {
		var $option = $(this).find("option:checked");
		var code = $option.val();

		//移除所有下级下拉控件
		$(this).nextAll().remove();
		//设置maxLevel为当前下拉的level
		maxLevel = parseInt($(this).attr("level"));
		//选中有效项，生成下级下拉
		if (code > 0) {
			GenerateInput(code, maxLevel + 1);
		}
	}

	//默认option选项的text
	function DefaultValueByLevel(_level) {
		var defaultValue = "请选择";
		switch (_level.toString()) {
			case "1":
				defaultValue += "省";
				break;
			case "2":
				defaultValue += "市/区";
				break;
			case "3":
				defaultValue += "区/县/街道";
				break;
		}
		return defaultValue;
	}

	function GetItemObjByTextAndParentCode(_text, _parentCode) {
		if (_text == undefined || _text == "") {
			return {};
		}

		var itemObj = {}
		$.each(g_areas, function(index, item) {
			if (_text == item["name"] && _parentCode == item["parentCode"]) {
				itemObj = item;
			}
		});

		return itemObj;
	}

	function GetItemObjByValue(_value) {
		if (_value == undefined || _value == "") {
			return {};
		}

		var itemObj = {}
		$.each(g_areas, function(index, item) {
			if (_value == item["code"]) {
				itemObj = item;
			}
		});

		return itemObj;
	}

	function Get(_type) {
		var result = [];
		$.each($container.find("select"), function(index, item) {
			var text = $(item).find("option:checked").text().replace(/(^\s*)|(\s*$)/g, "");
			var value = $(item).find("option:checked").val().replace(/(^\s*)|(\s*$)/g, "");
			if (value > 0) {
				if (_type == "text") {
					result.push(text);
				} else if (_type == "value") {
					result.push(value);
				}
			}
		});

		return result.join("-");
	}

	//获取文本值，如广东省-肇庆市
	function GetText() {
		return Get("text");
	}

	//获取value值，如110000-220000
	function GetValue() {
		return Get("value");
	}

	//选中的路径中至少包含一个偏远地区就为true
	function IsRemote() {
		var isRemote = false;
		$.each($container.find("option:checked"), function(index, item) {
			if ($(item).attr("remote") == "true") {
				isRemote = true;
			}
		});

		return isRemote;
	}
	
	function IsCompleteSelect(){
		var isComplete=true;
		$.each($container.find("option:checked"), function(index, item) {
			if ($(item).val() == "-1") {
				isComplete = false;
			}
		});

		return isComplete;
	}

	var obj = {};
	obj.getText = GetText;
	obj.getValue = GetValue;
	obj.isRemote = IsRemote;
	obj.isCompleteSelect=IsCompleteSelect;

	return obj;
}
```
* * *
######fileupload (自定义文件上传控件)
```sh
 fileupload (自定义文件上传控件)
 初始化方法：var singleUpload=InitFileUpload("UploadFile");
 可用方法：singleUpload.getEditor() --获取当前单文件上传控件的KindEditor对象
```
```java
<!--fileupload的html-->
<tr>
    <td class="panel-header td-left">
		fileupload：
	</td>
	<td class="panel-header td-right">
		<a id="UploadFile" class="easyui-linkbutton" data-options="iconCls:'icon-custom-add'">上传文件</a>
	</td>
</tr>
```
```java
//初始化单文件上传控件
function InitFileUpload(_id, callBack) {
    var obj={};
	KindEditor.ready(function(k) {
		var editor = k.editor({
			uploadJson: "",
			fileManagerJson: "",
			customType: "",
			customSize: "",
			allowFileManager: true
		});

		k("#" + _id).click(function() {
			editor.loadPlugin("insertfile", function() {
				editor.plugin.fileDialog({
					fileUrl: k("#url").val(),
					clickFn: function(url, title) {
						editor.hideDialog();
						callBack&&callBack(url,title);
					}
				});
			});
		});
        
        obj.getEditor=function(){
        	return editor;
        };
	});
	
	return obj;
}
```
<br>

####分类模板页
<div style="width:90%;margin-left:5%">
 <img src="https://github.com/Monkey04/EasyuiFrameSite/raw/master/readme/classification.png" style="width:100%;height:100%"/>
</div>
<br>

```sh
 该模板页以easyui-treegrid为例，用于分类管理
 该treegrid支持拖动排序和改变文档结构，该拖动事件有三种类型top、bottom和append
 初始化代码如下
```
```java
   <table id="EasyTreegrid" class="easyui-treegrid" data-options="
    		  lines:true,
			  rownumbers:true,
			  border:false,
			  idField:'id',
			  treeField:'text',
			  animate:false,
			  toolbar:'#EasyToolBar',
			  columns:[[{field:'text',title:'名称',width:350,align:'left'}]],
			  onLoadSuccess:OnLoadSuccess,
			  onDrop:OnDrop
			">
			
	</table>
```
