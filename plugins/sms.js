
var express = require('express');
var router = express.Router();
var commonUtil = require('../lib/util.lib');
const SMSClient = require('@alicloud/sms-sdk')

const accessKeyId = 'LTAISDZdG2HhlySts'
const secretAccessKey = 'OdBm2SbdiTlaYSIgZGSDpVb04yXmwBs'

//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})

router.get('/send', [commonUtil.jsonHeader], function(req, res, next) {
  
  var data = {
    "code": 0,
    "message": "发送失败"
  }
  //发送短信
  smsClient.sendSMS({
    PhoneNumbers: '18108197129',
    SignName: '水云联',
    TemplateCode: 'SMS_147417388',
    TemplateParam: '{"name":"JuvoS","buyTime":"2018-10-01","modelName":"SLE5053","serveTel":"028-83270029"}'
  }).then(function (res) {
    let {Code}=res
    if (Code === 'OK') {
        //处理返回参数
        console.log("success:"+res)
        data = {
          "code": 200,
          "message": "发送成功"
        }
        return res.json(data);
    }
  }, function (err) {
    console.log("fail:"+err)
    return res.json(data);
  })
   
  
});

module.exports = router;
