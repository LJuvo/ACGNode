var fs = require('fs');
var multiparty = require('multiparty');
var formidable = require('formidable');
var fileLib = require('./file.lib');
var dateLib = require('./date.lib');
var codeGener = require('./codeGener.lib');
var commonUtil = require('./util.lib');
let uploadModel = {}

uploadModel.upload = function (){
	
}

uploadModel.mulUpload = async function (req, res, callback){
	var form = new multiparty.Form();
	var month = dateLib.getMonth();
	var fileUrl = './public/upload/'+dateLib.getYear()+'/'+month+'/';
	fileLib.dirExistH(fileUrl).then(function(){
		form.encoding = 'utf-8';
	    form.uploadDir = fileUrl;
	    form.maxFilesSize = 2 * 1024 * 1024;	//文件大小
	    // form.maxFields = 1000;   //设置所有文件的大小总和
	    //上传后处理
	    form.parse(req, function(err, fields, files) {
            if(err) return callback({status: 0,content: err});
            
            if((!commonUtil.isEmpty(files))&&(!commonUtil.isEmpty(fields))&&(!commonUtil.isEmpty(files['file']))){
                var inputFile = files['file'][0];
                var fileFormat = inputFile.originalFilename.split(".");
                var uploadedPath = inputFile.path;
    
                var codeGenNum = dateLib.getYear().toString()+month.toString()+codeGener.randomLenRadix(12,10);
                var dstPath = fileUrl+ codeGenNum+ "." + fileFormat[fileFormat.length - 1];
                //重命名为真实文件名
                fs.rename(uploadedPath, dstPath, function(err) {
                    if(err) return callback({status: 0,content: err});
    
                }) 
                callback({
                    status: 200,
                    type: fileFormat[fileFormat.length-1],
                    originName: inputFile.originalFilename,
                    codeGenNum: codeGenNum,
                    size: inputFile.size,
                    url: dstPath.slice(8),
                    fields: fields
                });
            }else{
                callback({
                    status: 0
                });
            }
            
	        
	    })
	});
}



uploadModel.forUpload = function (req, res, callback){
	var form = formidable.IncomingForm({
       encoding : 'utf-8',//上传编码
       uploadDir : "./public/upload/",//上传目录，指的是服务器的路径，如果不存在将会报错。
       keepExtensions : true,//保留后缀
       maxFieldsSize : 2 * 1024 * 1024//byte//最大可上传大小
   });
   var allFile=[];
   form.on('progress', function(bytesReceived, bytesExpected) {//在控制台打印文件上传进度
     var progressInfo = { 
        value: bytesReceived, 
        total: bytesExpected 
     }; 
     console.log('[progress]: ' + JSON.stringify(progressInfo)); 
     return res.write(JSON.stringify(progressInfo)); 
   })
   .on('file', function (filed, file) {
      allFile.push([filed, file]);//收集传过来的所有文件
   })
   .on('end', function() { 
      return res.end('上传成功！'); 
   })
   .on('error', function(err) {
     console.error('上传失败：', err.message); 
     next(err); 
   })
   .parse(req,function(err, fields, files){
     if(err){
        console.log(err);
     }
     allFile.forEach(function(file,index){
         var fieldName=file[0];
         var types = file[1].name.split('.');
         var date = new Date();
         var ms = Date.parse(date);
         fs.renameSync(file[1].path,form.uploadDir+"/"+types[0]+"."+String(types[types.length-1]));//重命名文件，默认的文件名是带有一串编码的，我们要把它还原为它原先的名字。
     });
   }); 
}

module.exports = uploadModel;