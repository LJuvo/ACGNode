"use strict";

var express = require("express");
var router = express.Router();
var multiparty = require("multiparty");
var db = require("../lib/mysql.lib");
var commonUtil = require("../lib/util.lib");
var codeGenerLib = require("../lib/codeGener.lib");
var dateLib = require("../lib/date.lib");

let GetModel = function(label, header, callback) {
  return router.get(label, header, function(req, res, next) {
    (async () => {
      return callback(req, res, next);
    })();
  });
};
let PostModel = function(label, header, callback) {
  router.post(label, header, function(req, res, next) {
    (async () => {
      return callback(req, res, next);
    })();
  });
};
let CreateModel = function(label, header = [commonUtil.jsonHeader], callback) {
  PostModel(label, header, callback);
};
let TestModel = function(label, header = [commonUtil.jsonHeader], callback) {
  return GetModel(label, header, callback);
};

module.exports = {
  CreateModel: CreateModel,
  GetModel: GetModel,
  PostModel: PostModel,
  TestModel: TestModel
};
