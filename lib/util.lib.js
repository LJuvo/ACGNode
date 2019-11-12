//判断字符是否为空的方法
var isEmpty = function(obj){
    if(typeof obj == "undefined" || obj == null || obj == ""){
        return true;
    }else{
        return false;
    }
}
var replaceKuo = function(str){
    str=str.toString();
    str=str.replace("[","");
    str=str.replace("]","");
    str=str.replace("''","");
    return str;
}
var jsonHeader = function jsonHeader(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();

};
var failArr = {
    "code": 0,
    "messgae": "获取失败!"
}
var changeTypeFromNum = function(str){
    switch(str){
        case '0': return "完全删除";
        case '200': return "待接单";
        case '201': return "已接单";
        case '203': return "待评价";
        case '204': return "已评价";
        case '100': return "异常订单";
        case '101': return "已取消";
        case '102': return "草稿";
        case '1200': return "拒接";
        default: return "信息有误";
    }
}
var changeTypeFromStr = function(str){
    switch(str){
        case 'del': return 0;
        case 'wait': return 200;
        case 'serve': return 201;
        case 'eval': return 203;
        case 'evaled': return 204;
        case 'abno': return 100;
        case 'cancel': return 101;
        case 'draft': return 102;
        case 'refuse': return 1200;
        default: return "信息有误";
    }
}
var menu = [{
    icon: 'el-icon-menu',    demandFlag: 0,    name: '已删除',    info: 'del',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 200,    name: '待接单',    info: 'wait',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 201,    name: '已接单',    info: 'serve',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 203,    name: '待评价',    info: 'eval',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 204,    name: '已评价',    info: 'evaled',    num: 0},{
    icon: 'el-icon-loading',    demandFlag: 100,    name: '异常订单',    info: 'abno',    num: 0},{
    icon: 'el-icon-loading',    demandFlag: 101,    name: '已取消',    info: 'cancel',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 102,    name: '草稿',    info: 'draft',    num: 0
}]
var menuServe = [{
    icon: 'el-icon-menu',    demandFlag: 200,    name: '可接单',    info: 'wait',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 201,    name: '待服务',    info: 'serve',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 203,    name: '待评价',    info: 'eval',    num: 0},{
    icon: 'el-icon-menu',    demandFlag: 204,    name: '已评价',    info: 'evaled',    num: 0},{
    icon: 'el-icon-loading',    demandFlag: 100,    name: '异常订单',    info: 'abno',    num: 0},{
    icon: 'el-icon-loading',    demandFlag: 1200,    name: '拒接',    info: 'refuse',    num: 0
}]

module.exports = {
    isEmpty : isEmpty,
    jsonHeader : jsonHeader,
    failArr : failArr,
    replaceKuo: replaceKuo,
    changeTypeFromNum: changeTypeFromNum,
    changeTypeFromStr: changeTypeFromStr,
    menu        : menu,
    menuServe   : menuServe
}