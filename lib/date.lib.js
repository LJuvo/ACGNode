'use strict'

let dateLib = {};
var date = new Date();

//获取年
dateLib.getYear = function(){
    var Y = date.getFullYear();
    return Y;
}
//获取月
dateLib.getMonth = function(){
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    return M;
}
//获取日
dateLib.getDay = function(){
	var D = date.getDate();
    return D;
}
//获取时
dateLib.getHour = function(){
    var h = date.getHours();
    return h;
}
//获取分
dateLib.getMinute = function(){
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    return m;
}
//获取秒
dateLib.getSecond = function(){
    var s = date.getSeconds(); 
    return s;
}
//获取时间戳
dateLib.getTimeStamp = function(){
    var timeStamp = this.getYear()+"-"
    +this.getMonth()+"-"+this.getDay()+" "
    +this.getHour()+":"+this.getMinute()+":"
    +this.getSecond();
    return timeStamp;
}

module.exports = dateLib;