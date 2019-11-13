var commonUtil = require("../../lib/util.lib");
var utilModule = require("../../lib/util.module");

module.exports = utilModule.TestModel("/", [commonUtil.jsonHeader], function(
  req,
  res,
  next
) {
  // var data = { code: 200, message: "获取Index信息成功!" };
  var data = { code: 200, path: "Index", message: "获取Index信息成功!" };
  console.log(data);
  res.json(data);
});
