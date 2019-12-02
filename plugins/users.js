var express = require("express");
var router = express.Router();
var commonUtil = require("../lib/util.lib");
var db = require("../lib/mysql.lib");

router.get("/", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var data = { code: 200, path: "Test", message: "获取Test Index信息成功!" };
    res.json(data);
  })();
});

router.post("/create", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var obj = JSON.parse(JSON.stringify(req.body));
    for (var k in obj) {
      obj = k;
    }
    obj = JSON.parse(obj);

    var data = {
      code: 200,
      messgae: "发布成功!"
    };

    var demandCode = codeGenerLib.generDemandCode(obj.userCode);
    while (1) {
      var flag = await db.FindOne("demand", { demandCode: demandCode });
      if (commonUtil.isEmpty(flag)) break;

      demandCode = codeGenerLib.generDemandCode(obj.userCode);
    }

    obj.demandCode = demandCode;
    obj.createTime = dateLib.getTimeStamp();
    obj.updateTime = dateLib.getTimeStamp();
    await db.INSERT("demand", obj, "");

    return res.json(data);
  })();
});

router.get("/list", [commonUtil.jsonHeader], async (req, res, next) => {
  let data = await db.FindAll("user", {}, "createTime", "desc");

  return res.json(data);
});

router.get("/list", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var data = {
      code: 200,
      path: "Test",
      message: "获取Test List信息成功!"
    };
    console.log(req.baseUrl, req.originalUrl);
    res.json(data);
  })();
});

module.exports = router;
