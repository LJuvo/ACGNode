'use strict';

let codeGener = {};

//长度与编码方式可指定
codeGener.randomLenRadix = function (len, radix){
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;
 
    if (len) {
      // Compact form
      for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
    } else {
      // rfc4122, version 4 form
      var r;
 
      // rfc4122 requires these characters
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
      uuid[14] = '4';
 
      // Fill in random data.  At i==19 set the high bits of clock sequence as
      // per rfc4122, sec. 4.1.5
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random()*16;
          uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
        }
      }
    }
 
    return uuid.join('');
}

codeGener.dateNowLen = function(randomLength){
	let idStr = Date.now().toString(36)
	idStr += Math.random().toString(36).substr(3,randomLength)
	return idStr;
}

codeGener.generCode = function(){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
	return 'MA'+Y+this.randomLenRadix(4,10)+M+D+this.randomLenRadix(6,10)+h+m;
}

codeGener.generProCode = function(){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
	return 'MR'+Y+this.randomLenRadix(6,10)+M+D+this.randomLenRadix(6,10)+h+m;
}

codeGener.generPlaceCode = function(){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
	return 'AR'+this.randomLenRadix(6,10)+M+D+h+m;
}

codeGener.generPhotoCode = function(ucode){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
	return 'UP'+this.randomLenRadix(6,10)+M+D+h+m+ucode;
}

codeGener.generDemandCode = function(ucode){
	var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var h = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
	return 'AC'+this.randomLenRadix(6,10)+M+D+h+m+ucode;
}


module.exports = codeGener;
