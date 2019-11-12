var express = require('express');
var router = express.Router();
var multiparty = require('multiparty');
var util = require('util');
var uploadModel = require('../lib/upload.lib');
var dateLib = require('../lib/date.lib');
var commonUtil = require('../lib/util.lib');
var codeGenerLib = require('../lib/codeGener.lib');
var db = require('../lib/mysql.lib');
var fs = require('fs');
const multer=require("multer");

//文件上传所需代码
//设置文件上传路径和文件命名
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        //文件上传成功后会放入public下的upload文件夹
        cb(null, './public/upload')
    },
    filename: function (req, file, cb){
        //设置文件的名字为其原本的名字，也可以添加其他字符，来区别相同文件，例如file.originalname+new Date().getTime();利用时间来区分
        cb(null, file.originalname)
    }
});
var upload = multer({
    storage: storage
});

router.route('/')
.get(function (req, res, next){	  
	return res.render('upload', { title: 'hello'});
})
.post(upload.single('file'),function(req, res, next) {
//拼接文件上传后的网络路径，
    var url = 'http://' + req.headers.host + '/upload/' + req.file.originalname;
    //将其发回客户端
    return res.json({
        code : 1,
        data : url
    });
});

router.route('/mul')
.get(function (req, res, next){	  
	return res.render('uploadmul', { title: 'hello'});
})
.post([commonUtil.jsonHeader], function(req, res, next) {
    uploadModel.mulUpload(req, res,function(data){
        if(data.status === 200){
            (async ()=>{
                var dataTemp = {
                  "status": 200,
                  "message": "上传成功!"
                }
                
                var userCode = commonUtil.replaceKuo(data.fields.userCode);
                var userFlagCode = userCode.toString().slice(5,12);
                var photoCode = commonUtil.replaceKuo(data.fields.photoCode);
                if(commonUtil.isEmpty(photoCode)){
                    photoCode = codeGenerLib.generPhotoCode(userFlagCode);
                    while(1){
                        var flag = await db.FindOne('photopool',{
                            'photoCode': photoCode,
                            'userCode': userCode
                        })
                        if(commonUtil.isEmpty(flag)) break;
                    
                        photoCode = codeGenerLib.generPhotoCode(userFlagCode);
                    }
                }
               
                var obj = {
                    photoCode: photoCode,
                    photoUrl: data.url,
                    userCode: userCode,
                    createTime: dateLib.getTimeStamp(),
                    updateTime:dateLib.getTimeStamp()
                }
                await db.INSERT('photopool', obj,'');

                dataTemp.photoCode = photoCode;
                return res.json(dataTemp);
            })();
        }else{
            return res.json({"status": 0,"message":'上传失败!文件大小限制'});
        }
    });
});
router.route('/for')
.get(function (req, res, next){	  
	return res.render('uploadfor', { title: 'hello'});
})
.post(function(req, res, next) {
	uploadModel.forUpload(req, res, function(data){
    	return res.json({status: 200,content:'上传成功！',data:data});
    });
});

router.route('/list')
.get(async function (req, res, next){	  
	var findInfo = {};
	// var data = await dbLib.mFindLike(picPoolModel,findInfo);
	return res.json({status: 200, message: "success", data: 'data'});
})

module.exports = router;
