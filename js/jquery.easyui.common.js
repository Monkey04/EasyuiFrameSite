/*
 * 基于easyui的一些通用方法
 * editor: monkey
 * time: 2016.07.04
 */

//格式化时间，依赖于extension.js
function TimeFormat(_value) {
	return new Date(parseInt(_value.replace("/Date(", "").replace(")/", "")) - (8 * 3600 * 1000)).Format("yyyy-MM-dd hh:mm:ss");
}

//格式化xml或html为字符串
function HtmlEncode(_text) {
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(_text));
	return div.innerHTML;
}

//图片地址格式化为img标签
function ImageFormat(_value, _width) {
	_width = (+_width) > 0 ? (+_width) : 40
	return "<img src='" + _value + "' style='width:" + _width + "px;height:" + _width + "px;vertical-align:middle'></img>"
}

//为有placeholder属性的easyui-text控件在初始化之后添加placeholder属性
function InitEasyTextboxPlaceHolder() {
	$.each($(".easyui-textbox[placeholder]"), function(i, o) {
		var placeholder = $(o).attr("placeholder");
		var $next = $(o).next();
		if($next.hasClass("textbox")) {
			$next.find(".textbox-text").attr("placeholder", placeholder);
		}
	});
}

//格式化布尔值为×或√
function BooleanFormat(_value) {
	if(_value.toString().toLowerCase() == "true") {
		return "<b style='color:green'>√</b>"
	} else {
		return "<b style='color:red'>×</b>"
	}
}

//空值格式化为×
function EmptyFormat(_value) {
	if(_value == undefined || _value == "") {
		return "<span style='color:red'>×</span>";
	}
	return _value;
}

//若时间为空，返回格式化后的空值
function CreateTimeFormat(_value) {
	if(_value == undefined || _value == "") {
		return EmptyFormat();
	} else {
		return TimeFormat(_value);
	}
}

//人民币格式化
function MoneyFormat(_value) {
	return "¥ " + _value;
}

//面积格式化
function AreaFormat(_value) {
	return _value + " ㎡";
}

//标红格式化，如果输入两个参数且_value等于_equal则标红
//如果只输入一个参数，则直接标红
function MarkRedFormat(_value, _equal) {
	if((typeof(_equal) != "undefined" && _value == _equal) || arguments.length == 1) {
		return "<span style='color:red'>" + _value + "</span>";
	}

	return _value;
}

//通用的清空表单方法，包括自定义控件
function CommonClearForm(_formId) {
	var $form = $("#" + _formId);
	$form.form("reset");

	//自定义多图上传控件清空
	$.each($(".multi-image-wrapper"), function(index, obj) {
		var $obj = $(obj);
		$obj.find("li").remove();
		$obj.parents(".panel").find(".panel-title").html("图片数（0）");
	});

	//自定义地区控件清空
	$.each($("select[level]"), function(index, obj) {
		var $obj = $(obj);
		if($obj.attr("level") == "1") {
			$obj.find("option[value=-1]").attr("selected", true);
		} else {
			$obj.remove();
		}
	})
}

//编辑页保存成功后询问是否关闭
function SaveConfirmCallBack() {
	easymsg.confirm("保存成功！是否关闭当前选项卡？", function() {
		top.CloseNowTab();
	})
}

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

function DatagridReload(_datagridId) {
	$("#" + _datagridId).datagrid("reload");
}

function DatagridDelete(_datagridId) {
	var selections = $("#" + _datagridId).datagrid("getSelections");
	if(selections.length > 0) {
		var ids = [];
		var idField = $("#" + _datagridId).datagrid("options").idField;
		$.each(selections, function(i, o) {
			ids.push(o[idField]);
		});
		easymsg.alert("要删除的行数据Id：" + ids.join(","))
	} else {
		easymsg.alert("请至少选择一行数据");
	}
}

function DatagridSelectAllOrNot(_datagridId) {
	var isChecked = $("#" + _datagridId).parents(".panel.datagrid").find(".datagrid-toolbar input.select-all").is(":checked");
	$("#" + _datagridId).datagrid(isChecked ? "selectAll" : "unselectAll");
}

function DatagridSearch(_datagridId, _value, _type) {
	alert("搜索内容：" + _value + "（类型：" + _type + "）")
	$("#" + _datagridId).datagrid("reload");
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

function DatagridMultiSelect(_datagridId, _callBack) {
	var selections = $("#" + _datagridId).datagrid("getSelections");
	if(selections.length > 0) {
		var ids = [];
		var idField = $("#" + _datagridId).datagrid("options").idField;
		$.each(selections, function(i, o) {
			ids.push(o[idField]);
		});
		_callBack && _callBack(ids, selections);
	} else {
		easymsg.alert("请至少选择一行数据");
	}
}

//-----------------end 通用的datagrid方法---------------------------------

//-------------------------初始化自定义表单控件 begin----------------------

//初始化文件上传控件
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

	var obj = {};
	obj.getData = GetData;
	obj.isEmpty = IsEmpty;
	obj.getNum = GetNum;

	return obj;
}

//-------------------------end 初始化自定义表单控件----------------------