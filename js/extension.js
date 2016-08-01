//--------------String类型扩展 Start----------------------------------

//去除字符串前后空格
String.prototype.Trim = function() {
	return this.replace(/(^\s*)|(\s*$)/g, '');
}

//判断字符串是否为空
String.prototype.IsEmpty = function() {
	return this.Trim().length == 0;
}

//判断字符串是否不为空
String.prototype.IsNotEmpty = function() {
	return this.Trim().length > 0;
}

//判断字符串是否是整数
String.prototype.IsInt = function() {
	return /^[-+]?\d*$/.test(this);
}

//判断字符串是否是浮点数
String.prototype.IsFloat = function() {
	return /^[-\+]?\d+(\.\d+)?$/.test(this);
}

//判断字符串是否是中文
String.prototype.IsChinese = function() {
	return /^[\u0391-\uFFE5]+$/.test(this);
}

//判断字符串是否是英文字母
String.prototype.IsLetter = function() {
	return /^[a-zA-Z]+$/.test(this);
}

//判断字符串是否是邮箱格式
String.prototype.IsEmail = function() {
	return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(this)
}

//判断字符串是否是身份证格式
String.prototype.IsIdentity = function() {
	return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this);
}

//判断字符串是否是手机号码格式
String.prototype.IsMobile = function() {
	return /^1[3|4|5|7|8]\d{9}$/.test(this);
}

//判断字符串是否是QQ格式
String.prototype.IsQQ = function() {
	return /^[1-9]\d{4,10}$/.test(this);
}

//字符串转化为数字，转化失败时使用默认值
String.prototype.ToInt = function(defaultValue) {
	defaultValue = isNaN(parseInt(defaultValue)) ? 0 : parseInt(defaultValue);
	return isNaN(parseInt(this)) ? defaultValue : parseInt(this);
}

//字符串转化为浮点数，转化失败时使用默认值，可设置精度，精度最多保留16位，可设置是否四舍五入
String.prototype.ToFloat = function(precision, isRound, defaultValue) {
	defaultValue = isNaN(parseFloat(defaultValue)) ? 0 : parseFloat(defaultValue);
	precision = isNaN(parseInt(precision)) ? 2 : parseInt(precision);
	precision = (precision >= 0 && precision <= 16) ? precision : 2;
	//默认四舍五入
	isRound = typeof(isRound) == "undefined" || !!isRound;

	var value = isNaN(parseFloat(this)) ? defaultValue : parseFloat(this);

	if (isRound) {
		value = value.toFixed(precision);
	} else {
		value = value.toFixed(precision + 1);
		value = value.substr(0, value.length - 1);
	}
	return value;
}

//字符串全部转为大写形式
String.prototype.ToUpper = function() {
	return this.toUpperCase();
}

//字符串全部转为小写形式
String.prototype.ToLower = function() {
	return this.toLowerCase();
}

//截断字符串，默认添加...
String.prototype.Sub = function(len, isAddDot) {
	var defaultLength = 10;
	if (len && len > 0) {
		defaultLength = parseInt(len);
	}
	if (typeof(isAddDot) == "undefined") {
		isAddDot = true;
	} else {
		isAddDot = !!isAddDot;
	}

	isAddDot = this.length > defaultLength && isAddDot;

	return this.substr(0, defaultLength) + (isAddDot ? "..." : "");
}

//合并多个空白为一个空白
String.prototype.MergeBlank = function() {
	return this.replace(/\s+/g, ' ');
}

//获取文件全名，最后一个"."之前的字符串
String.prototype.GetFileName = function() {
	var lastDotIndex = this.lastIndexOf('.');
	return lastDotIndex > 0 ? this.substr(0, lastDotIndex) : this;
}

//在路径名中提取文件名
String.prototype.GetFileNameInUrl = function() {
	var _key=this.substring(this.lastIndexOf("/")+1) //获取到格式为123.jpg
	return _key.substring(0,_key.lastIndexOf("."))
}

//获取文件扩展名，最后一个"."之后的字符串
String.prototype.GetExtensionName = function() {
	var lastDotIndex = this.lastIndexOf('.');
	return lastDotIndex > 0 ? this.substr(lastDotIndex + 1) : this;
}

//获取字符串字节数，一个中文字符串是两个字节
String.prototype.GetByteLength = function() {
	//把中文字符转为英文再计算字节
	return this.replace(/[^\u0000-\u00ff]/g,"aa").length;
}

//字符串转json数组，转换失败将抛异常
String.prototype.ToJsonObj = function() {
	return eval('(' + this + ')');
}

//字符串转时间类型
String.prototype.ToDateTime = function() {
	return new Date(Date.parse(this));
}

//字符串中是否包含某个子字符串
String.prototype.Contains = function(value) {
	var isContain = false;
	if (value && typeof(value) == "string") {
		isContain = this.indexOf(value) > -1;
	} else {
		throw new Error("The type of value is not String");
	}
	return isContain;
}

//--------------String类型扩展 End----------------------------------


//--------------Object类型扩展 Start-----------------------------------

//判断是否为空
//Object.prototype.IsNullOrEmpty = function() {
//	var obj = this;
//	var flag = false;
//	if (obj == null || obj == undefined || typeof(obj) == 'undefined' || obj.length == 0) {
//		flag = true;
//	} else if (obj instanceof String) {
//		flag = obj.replace(/(^\s*)|(\s*$)/g, '').length == 0;
//	}
//	//数字，时间类型的变量不为空
//	else if (obj.constructor != Date && obj.constructor != Number) {
//		flag = true;
//		for (var property in obj) {
//			if (obj.hasOwnProperty(property)) {
//				flag = false;
//			}
//		}
//	}
//
//	return flag;
//}

//--------------Object类型扩展 End-------------------------------------


//--------------Date类型扩展 Start-----------------------------------

//时间格式化，如yyyy-MM-dd，2015-11-12
Date.prototype.Format = function(format) {
	var o = {
		"M+": this.getMonth() + 1, //month 
		"d+": this.getDate(), //day 
		"h+": this.getHours(), //hour 
		"m+": this.getMinutes(), //minute 
		"s+": this.getSeconds(), //second 
		"q+": Math.floor((this.getMonth() + 3) / 3), //quarter 
		"S": this.getMilliseconds() //millisecond 
	}

	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}

	for (var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}

//计算时间差
Date.prototype.Diff = function(interval, objDate) {
	//若参数不足或 objDate 不是日期类型則回传 undefined  
	if (arguments.length < 2 || objDate.constructor != Date) {
		return undefined;
	}
	switch (interval.Trim().ToLower()) {
		//计算秒差                                                          
		case 's':
			return parseInt((objDate - this) / 1000);
			//计算分差  
		case 'n':
			return parseInt((objDate - this) / 60000);
			//计算時差  
		case 'h':
			return parseInt((objDate - this) / 3600000);
			//计算日差  
		case 'd':
			return parseInt((objDate - this) / 86400000);
			//计算周差  
		case 'w':
			return parseInt((objDate - this) / (86400000 * 7));
			//计算月差  
		case 'm':
			return (objDate.getMonth() + 1) + ((objDate.getFullYear() - this.getFullYear()) * 12) - (this.getMonth() + 1);
			//计算年差  
		case 'y':
			return objDate.getFullYear() - this.getFullYear();
			//输入有误  
		default:
			return undefined;
	}
};

//--------------Date类型扩展 End-----------------------------------



//--------------Array类型扩展 Start-----------------------------------

//数组添加新项
Array.prototype.Add = function(item) {
	if (arguments.length == 0 || item == null || item == undefined) {
		return this;
	}
	this.push(item);
}

//数组中是否存在值
Array.prototype.Contains=function(str){
	var isContains=false;
	for(var i=0;i<this.length;i++){
		if(this[i]==str){
			isContains=true;
		}
	}
	
	return isContains;
}

//数组批量添加新项
Array.prototype.AddRange = function(items) {
	if (items.constructor == Array) {
		for (var i = 0; i < items.length; i++) {
			this.push(items[i])
		}
	} else {
		this.Add(items);
	}
}

//清空数组
Array.prototype.Clear = function() {
	//this.splice(0,this.length);
	return []
}

//删除数组指定索引处的项
Array.prototype.RemoveAt = function(index) {
	index = parseInt(index);
	if (index >= 0 && index < this.length) {
		this.splice(index, 1);
	}
	return this
}

//在指定索引处插入项
Array.prototype.InsertAt = function(item, index) {
	index = parseInt(index);
	if (arguments.length == 2 && typeof(item) != "undefined" && index >= 0) {
		var len = this.length;
		if (len == 0) {
			this.unshift(item);
		} else if (index >= len) {
			this.push(item);
		} else {
			this.splice(index, 0, item);
		}
	}
	return this
}

//--------------Array类型扩展 End-----------------------------------