var dateLib = require('./date.lib');

var randomString = function(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}
var serveCodeGenerate = function(){
    return 'AC'+randomString(4)+dateLib.getMonth;
}
module.exports = {
    serveCodeGenerate: serveCodeGenerate,
    randomString : randomString
}