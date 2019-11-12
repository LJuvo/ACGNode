
var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var db = require('../lib/mysql.lib');
var commonUtil = require('../lib/util.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var dateLib = require('../lib/date.lib');

router.post('/create', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var obj = JSON.parse(JSON.stringify(req.body));
    for( var k in obj){
      obj = k;
    }
    obj = JSON.parse(obj);
    
    var data = {
      "code": 200,
      "messgae": "发布成功!"
    }
    
    var demandCode = codeGenerLib.generDemandCode(obj.userCode);
    while(1){
      var flag = await db.FindOne('demand',{'demandCode': demandCode})
      if(commonUtil.isEmpty(flag)) break;

      demandCode = codeGenerLib.generDemandCode(obj.userCode);
    }

    obj.demandCode = demandCode;
    obj.createTime = dateLib.getTimeStamp();
    obj.updateTime = dateLib.getTimeStamp();
    await db.INSERT('demand', obj,'');
    
    return res.json(data);
  })();
  
});
router.post('/photocode', [commonUtil.jsonHeader], function(req, res, next) { 
    var data = {
      "code": 200,
      "messgae": "创建成功!"
    }

    var form = new multiparty.Form();
    form.encoding = 'utf-8';
    form.parse(req, async (err, fields, files)=>{ 
      var userCode = commonUtil.replaceKuo(fields.userCode);
      var userFlagCode = userCode.toString().slice(5,12);
      photoCode = codeGenerLib.generPhotoCode(userFlagCode);
      while(1){
        var flag = await db.FindOne('photopool',{
            'photoCode': photoCode,
            'userCode': userCode
        })
        if(commonUtil.isEmpty(flag)) break;
    
        photoCode = codeGenerLib.generPhotoCode(userFlagCode);
      }

      data.photoCode = photoCode;
      return res.json(data);
    })
});
router.get('/photoList', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"messgae": "创建成功!"}
    var photoCode = req.query.code;
    var userCode = req.query.user;
    let dataTemp = await db.FindAll('photopool', {
      userCode: userCode,
      photoCode: photoCode,
      imgFlag: 200
    },'createTime','desc');
    var list = [];
    for(var item in dataTemp){
      var t = {
        url: dataTemp[item].photoUrl,
        imgcode: dataTemp[item].Id
      }
      list.push(t);
    }
    data.data = list;
    return res.json(data);
  })();
});
router.get('/photoDel', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "删除成功!"}
    var photoCode = req.query.code;
    var imgCode = req.query.img;
    await db.UPDATE('photopool', {imgFlag: 0},{
      photoCode: photoCode,
      Id: imgCode
    });
    
    return res.json(data);
  })();
});
router.get('/menu', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "获取菜单成功!"}
    var userCode = req.query.code;
    var menuList = [];
    var menuTemp = commonUtil.menu;
    for(var item in menuTemp){
      let num;
      if(menuTemp[item].demandFlag == 0){
        num = await db.COUNT('demand', {
          userCode: userCode
        });
        menuTemp[item] = {
          icon: 'el-icon-menu',
          demandFlag: 0,
          name: '全部',
          info: 'all',
          num: 0
        }
      }else{
        num = await db.COUNT('demand', {
          userCode: userCode,
          demandFlag: menuTemp[item].demandFlag
        });
      }
      menuTemp[item].num = num[0]['count(*)'];
      menuTemp[item].isActive = false;
      menuList.push(menuTemp[item]);
    }
    data.menu = menuList;
    
    return res.json(data);
  })();
});
router.get('/list', [commonUtil.jsonHeader], async (req, res, next)=> {

    var temp = req.query.code;
    var type = req.query.type;

    var demandFindObj = {userCode: temp};
    
    if(type!='all') demandFindObj.demandFlag = commonUtil.changeTypeFromStr(type);//获取状态值

    let data = await db.FindAll('demand', demandFindObj,'createTime','desc');
    var list = [];
    for(var item in data){
      let addressTemp = await db.FindAll('address', {addressCode:data[item].addressCode},'createTime','desc');
      
      var t = {
        demandCode: data[item].demandCode,
        type: commonUtil.changeTypeFromNum(data[item].demandFlag),
        describetion: data[item].describetion,
        supplyInfo: data[item].supplyInfo,
        address:{
          info: addressTemp[0].info,
          tel: addressTemp[0].tel
        },
        showImg: '',
        img: ''
      }

      let imgTemp;
      if(data[item].photoCode!='1111'){
        imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
        t.img = imgTemp;
        t.showImg = imgTemp[0].photoUrl;
      }
      
      list.push(t);
    }
    console.log(list);
    return res.json(list);

});
router.get('/menuServe', [commonUtil.jsonHeader], function(req, res, next) {
  (async ()=>{
    var data = {"code": 200,"message": "获取菜单成功!"}
    var userCode = req.query.code;
    var menuList = [];
    var menuTemp = commonUtil.menuServe;
    for(var item in menuTemp){
      let num;
      if(menuTemp[item].demandFlag == 200){
        num = await db.COUNT('demand', {
          demandFlag: menuTemp[item].demandFlag
        });
      }else{
        num = await db.COUNT('billqueue', {
          serveCode: userCode,
          billFlag: menuTemp[item].demandFlag
        });
      }
      menuTemp[item].num = num[0]['count(*)'];
      menuList.push(menuTemp[item]);
    }
    data.menu = menuList;
    
    return res.json(data);
  })();
});
router.get('/listServe', [commonUtil.jsonHeader], async (req, res, next)=> {

  var temp = req.query.code;
  var type = req.query.type;

  var demandFindObj = {};
  
  if(type!='all') demandFindObj.demandFlag = commonUtil.changeTypeFromStr(type);//获取状态值

  let data = await db.FindAll('demand', demandFindObj,'createTime','desc');
  var list = [];
  for(var item in data){
    let addressTemp = await db.FindOne('address', {addressCode:data[item].addressCode},'createTime','desc');
    
    var t = {
      demandCode: data[item].demandCode,
      type: commonUtil.changeTypeFromNum(data[item].demandFlag),
      typeNum: data[item].demandFlag,
      describetion: data[item].describetion,
      supplyInfo: data[item].supplyInfo,
      address:{
        info: addressTemp[0].info,
        tel: addressTemp[0].tel
      },
      showImg: '',
      img: ''
    }

    let imgTemp;
    if(data[item].photoCode!='1111'){
      imgTemp = await db.FindAll('photopool', {photoCode:data[item].photoCode},'createTime','desc');
      t.img = imgTemp;
      t.showImg = imgTemp[0].photoUrl;
    }
    
    list.push(t);
  }
  return res.json(list);

});

module.exports = router;
