var express = require("express");
var router = express.Router();
var commonUtil = require("../lib/util.lib");
var db = require("../lib/mysql.lib");
var dateLib = require("../lib/date.lib");
var codeGenerLib = require("../lib/codeGener.lib");

var basicTable = "article";

router.post("/add", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var obj = JSON.parse(JSON.stringify(req.body));
    for (var k in obj) {
      obj = k;
    }
    obj = JSON.parse(obj);

    let data = {
      code: 200,
      messgae: "发布成功!",
      obj: obj
    };

    obj.createTime = dateLib.getTimeStamp();
    obj.keyCode = codeGenerLib.generCode();
    let info = await db.INSERT(basicTable, obj, "");
    data.info = info;

    return res.json(data);
  })();
});

router.post("/update", [commonUtil.jsonHeader], async (req, res, next) => {
  var obj = JSON.parse(JSON.stringify(req.body));
  for (var k in obj) {
    obj = k;
  }
  obj = JSON.parse(obj);

  await db.UPDATE(basicTable, obj, { Id: obj.Id });

  var data = {
    code: 200,
    message: "更新信息成功!"
  };
  res.json(data);
});

router.post("/delete", [commonUtil.jsonHeader], async (req, res, next) => {
  var obj = JSON.parse(JSON.stringify(req.body));
  for (var k in obj) {
    obj = k;
  }
  obj = JSON.parse(obj);
  let s = await db.DELETE(basicTable, {
    Id: obj.Id
  });

  var data = {
    code: 200,
    message: "删除信息成功!",
    data: s
  };
  res.json(data);
});

router.get("/key", [commonUtil.jsonHeader], async (req, res, next) => {
  let queryObj = req.query;

  let data = await db.FindSIN(basicTable, { keyName: queryObj.keyName });
  // console.log("### Juvos |  ->", data);

  return res.json(data);
});

router.get("/list", [commonUtil.jsonHeader], async (req, res, next) => {
  let data = await db.FindAll(basicTable, {}, "createTime", "desc");

  return res.json(data);
});

router.post("/page", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var obj = JSON.parse(JSON.stringify(req.body));
    for (var k in obj) {
      obj = k;
    }
    obj = JSON.parse(obj);
    console.log(obj);

    let countNum = await db.COUNT(basicTable, "");
    let s = await db.PAGE(
      basicTable,
      "",
      obj.pageIndex || 1,
      obj.pageSizeNum || 10
    );
    var data = {
      code: 200,
      message: "获取信息成功!",
      currentPage: req.params.pageIndex || 1,
      pageSizeNum: req.params.pageSizeNum || 10,
      count: countNum[0]["count(*)"]
    };
    data.list = s;
    res.json(data);
  })();
});

module.exports = router;
