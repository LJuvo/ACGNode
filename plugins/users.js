var express = require("express");
var router = express.Router();
var commonUtil = require("../lib/util.lib");
var db = require("../lib/mysql.lib");

var basicTable = "user";

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
      messgae: "发布成功!",
      obj: obj
    };

    // obj.createTime = dateLib.getTimeStamp();
    // obj.updateTime = dateLib.getTimeStamp();
    // await db.INSERT("demand", obj, "");

    return res.json(data);
  })();
});

router.get("/list", [commonUtil.jsonHeader], async (req, res, next) => {
  let data = await db.FindAll(basicTable, {}, "createTime", "desc");

  return res.json(data);
});

module.exports = router;
