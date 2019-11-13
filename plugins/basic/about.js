var express = require("express");
var router = express.Router();
var commonUtil = require("../../lib/util.lib");

router.get("/", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var data = { code: 200, message: "获取About信息成功!" };
    res.json(data);
  })();
});
router.get("/home", [commonUtil.jsonHeader], function(req, res, next) {
  (async () => {
    var data = { code: 200, message: "获取About Home信息成功!" };
    res.json(data);
  })();
});

module.exports = router;
