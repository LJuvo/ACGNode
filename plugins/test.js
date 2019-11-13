var commonUtil = require("../lib/util.lib");
var utilModule = require("../lib/util.module");

module.exports = utilModule.TestModel("/", [commonUtil.jsonHeader], function(
  req,
  res,
  next
) {
  var data = { code: 200, message: "获取用户信息成功!" };
  res.json(data);
});
