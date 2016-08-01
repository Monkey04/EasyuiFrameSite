/*
 * 地区级联下拉控件的生成和取值
 * editor: monkey
 * time: 2016-07-09
 */

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