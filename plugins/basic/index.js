var express = require("express");
var router = express.Router();
var commonUtil = require("../../lib/util.lib");

router.get("/", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var data = { code: 200, path: "Test", message: "获取Test Index信息成功!" };
    res.json(data);
  })();
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

module.exports = {
  router: router
};
